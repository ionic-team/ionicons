const semver = require('semver');

const getDevVersion = () => {
  const originalVersion = require('../package.json').version;
  const baseVersion = semver.inc(originalVersion, 'patch');

  return baseVersion;
}

console.log(getDevVersion());