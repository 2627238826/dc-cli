const request = require('./request.js');
const { registry } = require('./env');
module.exports = async function getPackageVersion(id, range = '') {
  // const registry = (await require('./shouldUseTaobao')())
  //   ? `https://registry.npm.taobao.org`
  //   : `https://registry.npmjs.org`;
  let result;
  try {
    result = await request.get(
      // 关于npm对package的定义 https://docs.npmjs.com/about-packages-and-modules
      `${registry}/${encodeURIComponent(id).replace(/^%40/, '@')}/${range}`
    );
  } catch (err) {
    return err;
  }
  return result;
};
