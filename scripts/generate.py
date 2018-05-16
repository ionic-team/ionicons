from subprocess import call
import os, errno
import shutil
import subprocess
import json
import codecs
from collections import OrderedDict
import hashlib


SCRIPTS_PATH = os.path.dirname(os.path.abspath(__file__))
ROOT_PATH = os.path.join(SCRIPTS_PATH, '..')
SRC_PATH = os.path.join(ROOT_PATH, 'src')
DIST_PATH = os.path.join(ROOT_PATH, 'dist')
SVGO_CONFIG_PATH = os.path.join(ROOT_PATH, '.svgo.yml')
INPUT_SVG_DIR = os.path.join(SRC_PATH, 'svg')
OUTPUT_SVG_DIR = os.path.join(DIST_PATH, 'svg')
DATA_PATH = os.path.join(DIST_PATH, 'data')
FONTS_DOCS_PATH = os.path.join(ROOT_PATH, 'docs', 'fonts')
CSS_FOLDER_PATH = os.path.join(DIST_PATH, 'css')
INPUT_SCSS_FOLDER_PATH = os.path.join(SRC_PATH, 'scss')
OUTPUT_SCSS_FOLDER_PATH = os.path.join(DIST_PATH, 'scss')


def main():
  try:
    os.makedirs(DIST_PATH)
  except OSError as e:
    if e.errno != errno.EEXIST:
      raise

  try:
    os.makedirs(OUTPUT_SVG_DIR)
  except OSError as e:
    if e.errno != errno.EEXIST:
      raise

  if requires_update():
    generate_font_files()

  data = get_build_data()

  rename_svg_glyph_names(data)
  generate_scss(data)
  generate_svg_files()
  generate_cheatsheet(data)

  if requires_update():
    generate_docs_designer_pack_zip()


def requires_update():
  m = hashlib.sha256()

  for filename in os.listdir(INPUT_SVG_DIR):
    filename = os.path.join(INPUT_SVG_DIR, filename)
    with open(filename, 'rb') as inputfile:
      data = inputfile.read()
      m.update(data)

  current_hash = m.hexdigest()

  manifest_path = os.path.join(SCRIPTS_PATH, 'manifest.json')

  f = codecs.open(manifest_path, 'r', 'utf-8')
  data = json.loads(f.read())
  last_hash = data.get('hash')
  f.close()

  fonts_folder_exists = os.path.exists(FONTS_DOCS_PATH)

  print 'old hash: %s' % (last_hash)
  print 'new hash: %s' % (current_hash)
  print 'fonts folder exists: %s' % (fonts_folder_exists)

  if last_hash != current_hash or (not fonts_folder_exists):
    print "Generating fonts..."
    data['hash'] = current_hash

    with open(manifest_path, 'w') as outfile:
      json.dump(data, outfile)

    return True

  print "SVGs unchanged, skip generating fonts"
  return False


def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/font/generate_font.py" % (SCRIPTS_PATH)
  call(cmd, shell=True)


def generate_docs_designer_pack_zip():
  print "Generate Docs Designer Pack Zip"
  cmd = "node %s/build-zip.js" % (SCRIPTS_PATH)
  call(cmd, shell=True)


def generate_svg_files():
  print "Generate SVG Files"
  shutil.rmtree(OUTPUT_SVG_DIR)
  if not os.path.exists(OUTPUT_SVG_DIR):
    os.makedirs(OUTPUT_SVG_DIR)

  cmd = 'svgo -f %s -o %s --config=%s' % (INPUT_SVG_DIR, OUTPUT_SVG_DIR, SVGO_CONFIG_PATH)
  cwd = os.path.join(os.path.dirname(__file__), '../node_modules/svgo/bin')
  subprocess.call([cmd], shell=True, cwd=cwd)

  for filename in os.listdir(OUTPUT_SVG_DIR):
    svg_path = os.path.join(OUTPUT_SVG_DIR, filename)
    svg_read_file = open(svg_path, 'r')
    svg_text = svg_read_file.read()

    svg_text = svg_text.replace(' width="512px"', '')
    svg_text = svg_text.replace(' width="512"', '')
    svg_text = svg_text.replace(' height="512px"', '')
    svg_text = svg_text.replace(' height="512"', '')

    if 'viewBox="0 0 512 512"' not in svg_text:
      svg_text = svg_text.replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"')

    svg_write_file = open(svg_path, 'w')
    svg_write_file.write(svg_text)
    svg_write_file.close()


def rename_svg_glyph_names(data):
  # hacky and slow (but safe) way to rename glyph-name attributes
  svg_path = os.path.join(FONTS_DOCS_PATH, 'ionicons.svg')
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
  try:
    os.makedirs(OUTPUT_SCSS_FOLDER_PATH)
  except OSError as e:
    if e.errno != errno.EEXIST:
      raise

  print "Generate SCSS"
  font_name = data['name']
  font_version = data['version']
  css_prefix = data['prefix']

  ionicons_core_file_path_input = os.path.join(INPUT_SCSS_FOLDER_PATH, 'ionicons-core.scss')
  ionicons_core_file_path_output = os.path.join(OUTPUT_SCSS_FOLDER_PATH, 'ionicons-core.scss')
  shutil.copyfile(ionicons_core_file_path_input, ionicons_core_file_path_output)

  ionicons_scc_file_path_input = os.path.join(INPUT_SCSS_FOLDER_PATH, 'ionicons.scss')
  ionicons_scc_file_path_output = os.path.join(OUTPUT_SCSS_FOLDER_PATH, 'ionicons.scss')
  shutil.copyfile(ionicons_scc_file_path_input, ionicons_scc_file_path_output)

  variables_file_path_input = os.path.join(INPUT_SCSS_FOLDER_PATH, 'ionicons-variables.scss')
  variables_file_path = os.path.join(OUTPUT_SCSS_FOLDER_PATH, 'ionicons-variables.scss')
  shutil.copyfile(variables_file_path_input, variables_file_path)

  common_file_path = os.path.join(OUTPUT_SCSS_FOLDER_PATH, 'ionicons-common.scss')
  icons_file_path = os.path.join(OUTPUT_SCSS_FOLDER_PATH, 'ionicons-icons.scss')


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


def generate_cheatsheet(data):
  print "Generate Cheatsheet"

  cheatsheet_file_path = os.path.join(DIST_PATH, 'cheatsheet.html')
  template_path = os.path.join(SRC_PATH, 'cheatsheet', 'template.html')
  icon_row_path = os.path.join(SRC_PATH, 'cheatsheet', 'icon-row.html')

  f = codecs.open(template_path, 'r', 'utf-8')
  template_html = f.read()
  f.close()

  f = codecs.open(icon_row_path, 'r', 'utf-8')
  icon_row_template = f.read()
  f.close()

  content = []
  icon_names = []

  for ionicon in data['icons']:
    name = ""
    if ionicon['name'].startswith('ios-'):
      name = ionicon['name'][4:]

    elif ionicon['name'].startswith('md-'):
      name = ionicon['name'][3:]

    if name not in icon_names:
      icon_names.append(name)

  icon_names.sort()

  for icon_name in icon_names:
    if icon_name != "":
      item_row = icon_row_template.replace('{{name}}', icon_name)
      item_row = item_row.replace('{{prefix}}', data['prefix'])

      content.append(item_row)

  template_html = template_html.replace("{{title}}", 'Cheatsheet')
  template_html = template_html.replace("{{font_name}}", data["name"])
  template_html = template_html.replace("{{font_version}}", data["version"])
  template_html = template_html.replace("{{icon_count}}", str(len(icon_names)) )
  template_html = template_html.replace("{{content}}", '\n'.join(content) )

  f = codecs.open(cheatsheet_file_path, 'w', 'utf-8')
  f.write(template_html)
  f.close()


def get_build_data():
  manifest_path = os.path.join(SCRIPTS_PATH, 'manifest.json')

  f = codecs.open(manifest_path, 'r', 'utf-8')
  data = json.loads(f.read())
  f.close()

  package_json_path = os.path.join(ROOT_PATH, 'package.json')
  f = codecs.open(package_json_path, 'r', 'utf-8')
  package_data = json.loads(f.read())
  f.close()

  data['version'] = package_data['version']

  return data


def get_tag_data():
  tag_data_path = os.path.join(SCRIPTS_PATH, 'tags.json')

  f = codecs.open(tag_data_path, 'r', 'utf-8')
  data = json.loads(f.read())
  f.close()
  return data


if __name__ == "__main__":
  main()
