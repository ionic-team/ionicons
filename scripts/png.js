const fs = require('fs-extra');
const path = require('path');
const svg2png = require('svg2png');
const crypto = require('crypto');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TMP_DIR = path.join(ROOT_DIR, 'tmp');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SVG_SRC_DIR = path.join(SRC_DIR, 'svg');
const PNG_DIST_DIR = path.join(DIST_DIR, 'png');

const SIZES = [64];
const MaxConcurrent = 5;

async function main() {
  // clean
  await clean();

  const svgFileNames = (await fs.readdir(SVG_SRC_DIR)).filter(f => {
    return f.split('.').pop() === 'svg';
  });

  const tasks = [];
  svgFileNames.forEach(svgFileName => {
    SIZES.forEach(size => {
      tasks.push({
        svgFileName,
        size
      });
    });
  });

  await runTasks(tasks);
  console.log('Done!');
}

async function runTasks(tasks) {

  await Promise.all(Array.from({length: MaxConcurrent})
    .map(() => worker(tasks)));

}

async function worker(tasks) {
  while(true) {
    const task = tasks.pop();
    if(!task) {
      return;
    }
    const size = task.size;
    const svgFileName = task.svgFileName;
    const svgFilePath = path.join(SVG_SRC_DIR, svgFileName);
    const pngFileName = svgFileName.replace('.svg', '.png');
    const sourceBuffer = await fs.readFile(svgFilePath);
    const hash = crypto.createHash('sha1')
      .update(sourceBuffer.toString())
      .digest('base64')
      .replace(/\W/g, '');

    await generatePng(pngFileName, sourceBuffer, hash, size)
  }
}

async function clean() {
  await Promise.all([
    fs.ensureDir(DIST_DIR),
    fs.ensureDir(TMP_DIR),
    fs.emptyDir(PNG_DIST_DIR),

    ...SIZES.map(async size => {
      const pngDir = path.join(PNG_DIST_DIR, size.toString());
      await fs.emptyDir(pngDir);
    })
  ]);
}

async function generatePng(pngFileName, sourceBuffer, hash, size) {
  const cachedFilePath = path.join(TMP_DIR, hash + '.' + size + '.png');
  const pngFilePath = path.join(PNG_DIST_DIR, size.toString(), pngFileName);

  try {
    const cachedFileContent = await fs.readFile(cachedFilePath);
    await fs.writeFile(pngFilePath, cachedFileContent);

  } catch (e) {
    const outputBuffer = await svg2png(sourceBuffer, { width: size, height: size });

    await Promise.all([
      fs.writeFileSync(pngFilePath, outputBuffer),
      fs.writeFileSync(cachedFilePath, outputBuffer)
    ]);
  }
  console.log('converted to png', size, pngFileName);
}

main();
