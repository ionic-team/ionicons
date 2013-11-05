from subprocess import call
import os
import json


BUILDER_PATH = os.path.dirname(os.path.abspath(__file__))
ROOT_PATH = os.path.join(BUILDER_PATH, '..')
FONTS_FOLDER_PATH = os.path.join(ROOT_PATH, 'fonts')
CSS_FOLDER_PATH = os.path.join(ROOT_PATH, 'css')
SCSS_FOLDER_PATH = os.path.join(ROOT_PATH, 'scss')


def main():
  generate_font_files()

  data = get_manifest()

  generate_scss(data)
  generate_cheatsheet(data)
  generate_component_json(data)
  generate_composer_json(data)
  generate_bower_json(data)


def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/scripts/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)


def generate_scss(data):
  print "Generate SCSS"
  font_name = data['name']
  font_version = data['version']
  css_prefix = data['prefix']
  variables_file_path = os.path.join(SCSS_FOLDER_PATH, '_ionicons-variables.scss')
  icons_file_path = os.path.join(SCSS_FOLDER_PATH, '_ionicons-icons.scss')

  d = []
  d.append('// Ionicons Variables')
  d.append('// --------------------------\n')
  d.append('$ionicons-font-path: "../fonts" !default;')
  d.append('$ionicons-font-family: "%s" !default;' % (font_name) )
  d.append('$ionicons-version: "%s" !default;' % (font_version) )
  d.append('$ionicons-prefix: %s !default;' % (css_prefix) )
  d.append('')
  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('$ionicon-var-%s: "%s";' % (ionicon['name'], chr_code) )
  f = open(variables_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()

  d = []
  d.append('// Ionicons Icons')
  d.append('// --------------------------\n')

  group = [ '.%s' % (data['name'].lower()) ]
  for ionicon in data['icons']:
    group.append('.%s%s' % (css_prefix, ionicon['name']) )

  d.append( ',\n'.join(group) )

  d.append('{')
  d.append('  @extend .ion;')
  d.append('}')

  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('.#{$ionicons-prefix}%s:before { content: "%s"; }' % (ionicon['name'], chr_code) )
  
  f = open(icons_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()

  generate_css_from_scss(data)


def generate_css_from_scss(data):
  print "Generate CSS From SCSS"

  scss_file_path = os.path.join(SCSS_FOLDER_PATH, '%s.scss' % (data['name'].lower()))
  css_file_path = os.path.join(CSS_FOLDER_PATH, '%s.css' % (data['name'].lower()))
  css_min_file_path = os.path.join(CSS_FOLDER_PATH, '%s.min.css' % (data['name'].lower()))

  cmd = "sass %s %s" % (scss_file_path, css_file_path)
  call(cmd, shell=True)

  print "Generate Minified CSS From SCSS"
  cmd = "sass %s %s --style compressed" % (scss_file_path, css_min_file_path)
  call(cmd, shell=True)


def generate_cheatsheet(data):
  print "Generate Cheatsheet"

  css_file_path = os.path.join(CSS_FOLDER_PATH, '%s.css' % (data['name'].lower()))
  cheatsheet_file_path = os.path.join(ROOT_PATH, 'cheatsheet.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'icon-row.html')

  f = open(template_path, 'r')
  template_html = f.read()
  f.close()

  f = open(css_file_path, 'r')
  ionicons_css = f.read()
  f.close()

  f = open(icon_row_path, 'r')
  icon_row_template = f.read()
  f.close()

  content = []

  for ionicon in data['icons']:
    css_code = ionicon['code'].replace('0x', '\\')
    escaped_html_code = ionicon['code'].replace('0x', '&amp;#x') + ';'
    html_code = ionicon['code'].replace('0x', '&#x') + ';'
    item_row = icon_row_template

    item_row = item_row.replace('{{name}}', ionicon['name'])
    item_row = item_row.replace('{{prefix}}', data['prefix'])
    item_row = item_row.replace('{{css_code}}', css_code)
    item_row = item_row.replace('{{escaped_html_code}}', escaped_html_code)
    item_row = item_row.replace('{{html_code}}', html_code)

    content.append(item_row)

  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_filename}}", data["name"].lower())
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(data["icons"])) )
  template_html = template_html.replace("{{ionicons_css}}", ionicons_css )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = open(cheatsheet_file_path, 'w')
  f.write(template_html)
  f.close()


def generate_component_json(data):
  print "Generate component.json"
  d = {
    "name": data['name'],
    "repo": "driftyco/ionicons",
    "description": "The premium icon font for Ionic Framework.",
    "version": data['version'],
    "keywords": [],
    "dependencies": {},
    "development": {},
    "license": "MIT",
    "styles": [
      "css/%s.css" % (data['name'].lower())
    ],
    "fonts": [
      "fonts/%s.eot" % (data['name'].lower()),
      "fonts/%s.svg" % (data['name'].lower()),
      "fonts/%s.ttf" % (data['name'].lower()),
      "fonts/%s.woof" % (data['name'].lower())
    ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  component_file_path = os.path.join(ROOT_PATH, 'component.json')
  f = open(component_file_path, 'w')
  f.write(txt)
  f.close()


def generate_composer_json(data):
  print "Generate composer.json"
  d = {
    "name": "driftyco/ionicons",
    "description": "The premium icon font for Ionic Framework.",
    "keywords": [ "fonts", "icon font", "icons", "ionic", "web font"],
    "homepage": "http://ionicons.com/",
    "authors": [
      {
        "name": "Ben Sperry",
        "email": "ben@drifty.com",
        "role": "Designer",
        "homepage": "https://twitter.com/helloimben"
      },
      {
        "name": "Adam Bradley",
        "email": "adam@drifty.com",
        "role": "Developer",
        "homepage": "https://twitter.com/adamdbradley"
      },
      {
        "name": "Max Lynch",
        "email": "max@drifty.com",
        "role": "Developer",
        "homepage": "https://twitter.com/maxlynch"
      }
    ],
    "extra": {},
    "license": [ "MIT" ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  composer_file_path = os.path.join(ROOT_PATH, 'composer.json')
  f = open(composer_file_path, 'w')
  f.write(txt)
  f.close()


def generate_bower_json(data):
  print "Generate bower.json"
  d = {
    "name": data['name'],
    "version": data['version'],
    "homepage": "https://github.com/driftyco/ionicons",
    "authors": [
      "Ben Sperry <ben@drifty.com>",
      "Adam Bradley <adam@drifty.com>",
      "Max Lynch <max@drifty.com>"
    ],
    "description": "Ionicons - free and beautiful icons from the creators of Ionic Framework",
    "main": [
      "css/%s.css" % (data['name'].lower()), 
      "fonts/*"
    ],
    "keywords": [ "fonts", "icon font", "icons", "ionic", "web font"],
    "license": "MIT",
    "ignore": [
      "**/.*",
      "builder",
      "node_modules",
      "bower_components",
      "test",
      "tests"
    ]
  }
  txt = json.dumps(d, indent=4, separators=(',', ': '))

  bower_file_path = os.path.join(ROOT_PATH, 'bower.json')
  f = open(bower_file_path, 'w')
  f.write(txt)
  f.close()


def get_manifest():
  manifest_path = os.path.join(BUILDER_PATH, 'manifest.json')
  f = open(manifest_path, 'r')
  manifest_data = json.loads(f.read())
  f.close()
  return manifest_data


if __name__ == "__main__":
  main()
