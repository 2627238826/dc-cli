async function getPackageTarball(pkgName, tag = 'latest') {
  const getPackageVersion = require('./getPackageVersion');
  const res = await getPackageVersion(pkgName, tag);
  if (res.statusCode === 200) {
    const {
      dist: { tarball }
    } = res.body;
    if (tarball) {
      return tarball;
    }
    return false;
  }
  return false;
}

module.exports = getPackageTarball;
