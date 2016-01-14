from subprocess import call
import os
import shutil
import subprocess
import json
import codecs
from collections import OrderedDict


BUILDER_PATH = os.path.dirname(os.path.abspath(__file__))
ROOT_PATH = os.path.join(BUILDER_PATH, '..')
DIST_PATH = os.path.join(ROOT_PATH, 'dist')
INPUT_SVG_DIR = os.path.join(ROOT_PATH, 'src')
OUTPUT_SVG_DIR = os.path.join(DIST_PATH, 'svg')
DATA_PATH = os.path.join(DIST_PATH, 'data')
FONTS_FOLDER_PATH = os.path.join(DIST_PATH, 'fonts')
CSS_FOLDER_PATH = os.path.join(DIST_PATH, 'css')
SCSS_FOLDER_PATH = os.path.join(DIST_PATH, 'scss')


def main():
  generate_font_files()

  data = get_build_data()

  generate_data_files(data)
  rename_svg_glyph_names(data)
  generate_scss(data)
  generate_svg_files()
  generate_cheatsheet(data)
  generate_mode_cheatsheet(data)
  generate_icon_comparison(data)


def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/scripts/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)


def generate_data_files(data):
  print "Generate Data Files"
  icon_names = []
  mode_icons = []
  logo_icons = []
  all_icons = {}
  tag_data = get_tag_data()

  def get_code_by_name(icon_name):
    for ionicon in data['icons']:
      if ionicon['name'] == icon_name:
        return ionicon['code']

    return ''

  for ionicon in data['icons']:
    name = ""
    if ionicon['name'].startswith('ios-'):
      name = ionicon['name'][4:]

    elif ionicon['name'].startswith('md-'):
      name = ionicon['name'][3:]

    elif ionicon['name'].startswith('logo-'):
      name = ionicon['name'][5:]

    if name not in icon_names:
      icon_names.append(name)

  for icon_name in icon_names:
    ios_svg = os.path.join(INPUT_SVG_DIR, 'ios-%s.svg' % (icon_name))
    md_svg = os.path.join(INPUT_SVG_DIR, 'md-%s.svg' % (icon_name))
    logo_svg = os.path.join(INPUT_SVG_DIR, 'logo-%s.svg' % (icon_name))

    if os.path.isfile(ios_svg) and os.path.isfile(md_svg):
      mode_icons.append('"%s":1' % icon_name)

      all_icons[icon_name] = {
        'icons': [
          {
            'code': get_code_by_name('ios-%s' % (icon_name)),
            'name': 'ios-%s' % (icon_name)
          },
          {
            'code': get_code_by_name('ios-%s-outline' % (icon_name)),
            'name': 'ios-%s-outline' % (icon_name)
          },
          {
            'code': get_code_by_name('md-%s' % (icon_name)),
            'name': 'md-%s' % (icon_name)
          }
        ],
        'tags': tag_data.get(icon_name) or icon_name.split('-')
      }

    elif os.path.isfile(logo_svg):
      logo_icons.append('"%s":1' % icon_name)

      all_icons[icon_name] = {
        'icons': [
          {
            'code': get_code_by_name('logo-%s' % (icon_name)),
            'name': 'logo-%s' % (icon_name) or icon_name.split('-')
          }
        ],
        'tags': tag_data.get(icon_name) or icon_name.split('-')
      }

    elif '-outline' in icon_name:
      continue

    else:
      print 'wtf %s' % icon_name

  output = '{\n' +  ',\n'.join(mode_icons) + '\n}'

  f = codecs.open(os.path.join(DATA_PATH, 'mode-icons.json'), 'w', 'utf-8')
  f.write(output)
  f.close()

  output = '{\n' +  ',\n'.join(logo_icons) + '\n}'
  f = codecs.open(os.path.join(DATA_PATH, 'logo-icons.json'), 'w', 'utf-8')
  f.write(output)
  f.close()

  all_icons = OrderedDict(sorted(all_icons.items(), key=lambda t: t[0]))

  f = codecs.open(os.path.join(DATA_PATH, 'ionicons.json'), 'w', 'utf-8')
  f.write( json.dumps(all_icons, indent=2, separators=(',', ': ')) )
  f.close()


def generate_svg_files():
  print "Generate SVG Files"
  shutil.rmtree(OUTPUT_SVG_DIR)
  if not os.path.exists(OUTPUT_SVG_DIR):
    os.makedirs(OUTPUT_SVG_DIR)
  cmd = 'svgo -f %s -o %s' % (INPUT_SVG_DIR, OUTPUT_SVG_DIR)
  subprocess.call([cmd], shell=True)


def rename_svg_glyph_names(data):
  # hacky and slow (but safe) way to rename glyph-name attributes
  svg_path = os.path.join(FONTS_FOLDER_PATH, 'ionicons.svg')
  svg_file = codecs.open(svg_path, 'r+', 'utf-8')
  svg_text = svg_file.read()
  svg_file.seek(0)

  for ionicon in data['icons']:
    # uniF2CA
    org_name = 'uni%s' % (ionicon['code'].replace('0x', '').upper())
    ion_name = 'ion-%s' % (ionicon['name'])
    svg_text = svg_text.replace(org_name, ion_name)

  svg_file.write(svg_text)
  svg_file.close()


def generate_scss(data):
  print "Generate SCSS"
  font_name = data['name']
  font_version = data['version']
  css_prefix = data['prefix']
  variables_file_path = os.path.join(SCSS_FOLDER_PATH, 'ionicons-variables.scss')
  common_file_path = os.path.join(SCSS_FOLDER_PATH, 'ionicons-common.scss')
  icons_file_path = os.path.join(SCSS_FOLDER_PATH, 'ionicons-icons.scss')

  d = []
  d.append('@charset "UTF-8";')
  d.append('// Ionicons Variables')
  d.append('// --------------------------\n')
  d.append('$ionicons-font-path: "../fonts" !default;')
  d.append('$ionicons-font-family: "%s" !default;' % (font_name) )
  d.append('$ionicons-version: "%s" !default;' % (font_version) )

  f = codecs.open(variables_file_path, 'w', 'utf-8')
  f.write( u'\n'.join(d) )
  f.close()

  d = []
  d.append('@charset "UTF-8";')
  d.append('// Ionicons Common CSS')
  d.append('// --------------------------\n')

  group = [ '.%s' % (data['name'].lower()) ]
  for ionicon in data['icons']:
    group.append('.%s%s:before' % (css_prefix, ionicon['name']) )

  d.append( ',\n'.join(group) )

  d.append('{')
  d.append('  @extend .ion;')
  d.append('}')

  f = codecs.open(common_file_path, 'w', 'utf-8')
  f.write( '\n'.join(d) )
  f.close()

  d = []
  d.append('@charset "UTF-8";')
  d.append('// Ionicons Icon Font CSS')
  d.append('// --------------------------\n')

  for ionicon in data['icons']:
    chr_code = ionicon['code'].replace('0x', '\\')
    d.append('.%s%s:before { content: "%s"; }' % (css_prefix, ionicon['name'], chr_code) )

  f = codecs.open(icons_file_path, 'w', 'utf-8')
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

  f = codecs.open(template_path, 'r', 'utf-8')
  template_html = f.read()
  f.close()

  f = codecs.open(icon_row_path, 'r', 'utf-8')
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

  f = codecs.open(cheatsheet_file_path, 'w', 'utf-8')
  f.write(template_html)
  f.close()


def generate_mode_cheatsheet(data):
  print "Generate Mode Cheatsheet"

  cheatsheet_file_path = os.path.join(ROOT_PATH, 'mode-cheatsheet.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'mode-icon-row.html')

  f = codecs.open(template_path, 'r', 'utf-8')
  template_html = f.read()
  f.close()

  f = codecs.open(icon_row_path, 'r', 'utf-8')
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

  f = codecs.open(cheatsheet_file_path, 'w', 'utf-8')
  f.write(template_html)
  f.close()


def generate_icon_comparison(data):
  print "Generate Icon Comparison"

  comparison_file_path = os.path.join(ROOT_PATH, 'icon-comparison.html')
  template_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(BUILDER_PATH, 'cheatsheet', 'icon-comparison-row.html')

  f = codecs.open(template_path, 'r', 'utf-8')
  template_html = f.read()
  f.close()

  f = codecs.open(icon_row_path, 'r', 'utf-8')
  icon_row_template = f.read()
  f.close()

  content = []
  icon_count = 0

  content.append('''
    <div class="comparison-row">
      <div class="comparison-col">
        <h2>Source SVG</h2>
      </div>
      <div class="comparison-col">
        <h2>Optimized SVG</h2>
      </div>
      <div class="comparison-col">
        <h2>Icon Font</h2>
      </div>
    </div>
  ''')

  for ionicon in data['icons']:
    src_svg_file = os.path.join(INPUT_SVG_DIR, '%s.svg' % (ionicon['name']))
    if not os.path.isfile(src_svg_file):
      continue

    icon_count += 1
    item_row = icon_row_template.replace('{{name}}', ionicon['name'])
    item_row = item_row.replace('{{prefix}}', data['prefix'])

    src_svg = 'src/%s.svg' % (ionicon['name'])
    item_row = item_row.replace('{{src_svg}}', src_svg)

    src_svg_size = os.path.getsize(src_svg_file)
    item_row = item_row.replace('{{src_svg_size}}', str(src_svg_size))

    optimized_svg = 'dist/svg/%s.svg' % (ionicon['name'])
    item_row = item_row.replace('{{optimized_svg}}', optimized_svg)

    optimized_svg_file = os.path.join(OUTPUT_SVG_DIR, '%s.svg' % (ionicon['name']))
    optimized_svg_size = os.path.getsize(optimized_svg_file)
    item_row = item_row.replace('{{optimized_svg_size}}', str(optimized_svg_size))

    content.append(item_row)

  template_html = template_html.replace("{{title}}", 'Icon Format Comparison')
  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(icon_count) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = codecs.open(comparison_file_path, 'w', 'utf-8')
  f.write(template_html)
  f.close()


def get_build_data():
  build_data_path = os.path.join(BUILDER_PATH, 'build_data.json')

  f = codecs.open(build_data_path, 'r', 'utf-8')
  data = json.loads(f.read())
  f.close()
  
  package_json_path = os.path.join(ROOT_PATH, 'package.json')
  f = codecs.open(package_json_path, 'r', 'utf-8')
  package_data = json.loads(f.read())
  f.close()
  
  data['version'] = package_data['version']
  
  return data


def get_tag_data():
  tag_data_path = os.path.join(BUILDER_PATH, 'tags.json')

  f = codecs.open(tag_data_path, 'r', 'utf-8')
  data = json.loads(f.read())
  f.close()
  return data


if __name__ == "__main__":
  main()
