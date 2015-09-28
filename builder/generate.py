from subprocess import call
import os
import json


BUILDER_PATH = os.path.dirname(os.path.abspath(__file__))
ROOT_PATH = os.path.join(BUILDER_PATH, '..')
INPUT_SVG_DIR = os.path.join(ROOT_PATH, 'src')
DATA_PATH = os.path.join(ROOT_PATH, 'data')
FONTS_FOLDER_PATH = os.path.join(ROOT_PATH, 'fonts')
CSS_FOLDER_PATH = os.path.join(ROOT_PATH, 'css')
SCSS_FOLDER_PATH = os.path.join(ROOT_PATH, 'scss')
LESS_FOLDER_PATH = os.path.join(ROOT_PATH, 'less')


def main():
  generate_font_files()

  data = get_build_data()

  generate_data_files(data)
  rename_svg_glyph_names(data)
  generate_scss(data)
  generate_less(data)
  generate_cheatsheet(data)
  generate_mode_cheatsheet(data)


def generate_data_files(data):
  print "Generate Data Files"
  icon_names = []
  mode_icons = []
  generic_icons = []

  for ionicon in data['icons']:
    name = ""
    if ionicon['name'].startswith('ios-'):
      name = ionicon['name'][4:]

    elif ionicon['name'].startswith('md-'):
      name = ionicon['name'][3:]

    elif ionicon['name'].startswith('social-'):
      name = ionicon['name'][7:]

    if name not in icon_names:
      icon_names.append(name)

  for icon_name in icon_names:
    ios_svg = os.path.join(INPUT_SVG_DIR, 'ios-%s.svg' % (icon_name))
    md_svg = os.path.join(INPUT_SVG_DIR, 'md-%s.svg' % (icon_name))
    social_svg = os.path.join(INPUT_SVG_DIR, 'social-%s.svg' % (icon_name))

    if os.path.isfile(ios_svg) and os.path.isfile(md_svg):
      mode_icons.append('"%s":1' % icon_name)

    elif os.path.isfile(social_svg):
      generic_icons.append('"%s":1' % icon_name)

    elif '-outline' in icon_name:
      continue

    else:
      print 'wtf %s' % icon_name

  output = '{\n' +  ',\n'.join(mode_icons) + '\n}'
  f = open(os.path.join(DATA_PATH, 'mode-icons.json'), 'w')
  f.write(output)
  f.close()

  output = '{\n' +  ',\n'.join(generic_icons) + '\n}'
  f = open(os.path.join(DATA_PATH, 'generic-icons.json'), 'w')
  f.write(output)
  f.close()


def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/scripts/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)


def rename_svg_glyph_names(data):
  # hacky and slow (but safe) way to rename glyph-name attributes
  svg_path = os.path.join(FONTS_FOLDER_PATH, 'ionicons.svg')
  svg_file = open(svg_path, 'r+')
  svg_text = svg_file.read()
  svg_file.seek(0)

  for ionicon in data['icons']:
    # uniF2CA
    org_name = 'uni%s' % (ionicon['code'].replace('0x', '').upper())
    ion_name = 'ion-%s' % (ionicon['name'])
    svg_text = svg_text.replace(org_name, ion_name)

  svg_file.write(svg_text)
  svg_file.close()


def generate_less(data):
  print "Generate LESS"
  font_name = data['name']
  font_version = data['version']
  css_prefix = data['prefix']
  variables_file_path = os.path.join(LESS_FOLDER_PATH, '_ionicons-variables.less')
  icons_file_path = os.path.join(LESS_FOLDER_PATH, '_ionicons-icons.less')

  d = []
  d.append('/*!');
  d.append('Ionicons, v%s' % (font_version) );
  d.append('Created by Ben Sperry for the Ionic Framework, http://ionicons.com/');
  d.append('https://twitter.com/benjsperry  https://twitter.com/ionicframework');
  d.append('MIT License: https://github.com/driftyco/ionicons');
  d.append('*/');
  d.append('// Ionicons Variables')
  d.append('// --------------------------\n')
  d.append('@ionicons-font-path: "../fonts";')
  d.append('@ionicons-font-family: "%s";' % (font_name) )
  d.append('@ionicons-version: "%s";' % (font_version) )
  d.append('@ionicons-prefix: %s;' % (css_prefix) )
  d.append('')
  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('@ionicon-var-%s: "%s";' % (ionicon['name'], chr_code) )
  f = open(variables_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()

  d = []
  d.append('// Ionicons Icons')
  d.append('// --------------------------\n')

  group = [ '.%s' % (data['name'].lower()) ]
  for ionicon in data['icons']:
    group.append('.@{ionicons-prefix}%s:before' % (ionicon['name']) )

  d.append( ',\n'.join(group) )

  d.append('{')
  d.append('  &:extend(.ion);')
  d.append('}')

  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('.@{ionicons-prefix}%s:before { content: @ionicon-var-%s; }' % (ionicon['name'], ionicon['name']) )

  f = open(icons_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()


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
  d.append('$ionicon-vars: (')
  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('  %s: "%s",' % (ionicon['name'], chr_code) )
  d.append(');')
  f = open(variables_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()

  d = []
  d.append('// Ionicons Icon CSS')
  d.append('// --------------------------\n')

  d.append('@each $icon-class, $unicode in $ionicon-vars{')
  d.append('  .ionicons,')
  d.append('  .#{$ionicons-prefix}#{$icon-class}:before{')
  d.append('    @extend .ion;')
  d.append('  }')
  d.append('  .#{$ionicons-prefix}#{$icon-class}:before {')
  d.append('    content: $unicode;')
  d.append('  }')
  d.append('};')

  f = open(icons_file_path, 'w')
  f.write( '\n'.join(d) )
  f.close()

  generate_css_from_scss(data)


def generate_css_from_scss(data):
  compile_scss_to_css('ionicons', data)
  compile_scss_to_css('ionicons-core', data)


def compile_scss_to_css(filename, data):
  scss_file_path = os.path.join(SCSS_FOLDER_PATH, '%s.scss' % filename)
  css_file_path = os.path.join(CSS_FOLDER_PATH, '%s.css' % filename)
  css_min_file_path = os.path.join(CSS_FOLDER_PATH, '%s.min.css' % filename)

  print "Generate CSS From %s" % filename
  cmd = "sass %s %s --style compact" % (scss_file_path, css_file_path)
  call(cmd, shell=True)

  cmd = "sass %s %s --style compressed" % (scss_file_path, css_min_file_path)
  call(cmd, shell=True)


def generate_cheatsheet(data):
  print "Generate Cheatsheet"

  cheatsheet_file_path = os.path.join(ROOT_PATH, 'cheatsheet.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'icon-row.html')

  f = open(template_path, 'r')
  template_html = f.read()
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

  template_html = template_html.replace("{{title}}", 'Cheatsheet')
  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(data["icons"])) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = open(cheatsheet_file_path, 'w')
  f.write(template_html)
  f.close()


def generate_mode_cheatsheet(data):
  print "Generate Mode Cheatsheet"

  cheatsheet_file_path = os.path.join(ROOT_PATH, 'mode-cheatsheet.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'mode-icon-row.html')

  f = open(template_path, 'r')
  template_html = f.read()
  f.close()

  f = open(icon_row_path, 'r')
  icon_row_template = f.read()
  f.close()

  content = []
  icon_names = []


  content.append('''
  <div class="mode-row">
    <div class="mode-col">
      <strong>Icon Name</strong>
    </div>
    <div class="mode-col align-center">
      <strong>iOS</strong>
    </div>
    <div class="mode-col align-center">
      <strong>Material Design</strong>
    </div>
  </div>
  ''')

  for ionicon in data['icons']:
    name = ""
    if ionicon['name'].startswith('ios-'):
      name = ionicon['name'][4:]

    elif ionicon['name'].startswith('md-'):
      name = ionicon['name'][3:]

    if name not in icon_names and not name.endswith('-outline'):
      icon_names.append(name)


  for icon_name in icon_names:
    item_row = icon_row_template.replace('{{name}}', icon_name)
    item_row = item_row.replace('{{prefix}}', data['prefix'])

    content.append(item_row)

  template_html = template_html.replace("{{title}}", 'Mode Cheatsheet')
  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(icon_names)) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = open(cheatsheet_file_path, 'w')
  f.write(template_html)
  f.close()


def get_build_data():
  build_data_path = os.path.join(BUILDER_PATH, 'build_data.json')
  f = open(build_data_path, 'r')
  data = json.loads(f.read())
  f.close()
  return data


if __name__ == "__main__":
  main()
