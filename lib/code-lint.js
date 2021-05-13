const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const _ = require('lodash');
const { clearConsole } = require('./util/clearConsole');
const { logWithSpinner, stopSpinner } = require('./util/spinner');
const { log, error } = require('./util/logger');
const fetchRemotePreset = require('./util/loadRemotePreset');
const getPackageTarball = require('./util/getPackageTarball');
const { writeFileTree, deleteRemovedFiles } = require('./util/writeFileTree');
const TEMPLATE_NAME = 'http://192.168.3.200:80/web/vue-code-lint-temp.git';

async function addCodeLinting() {
  const cwd = process.cwd();
  const noUsedFiles = [
    'package.json',
    'config.json',
    'README.md',
    '.gitignore'
  ];
  // let tmpdir;
  // const tarball = await getPackageTarball(TEMPLATE_NAME);
  // if (!tarball) {
  //   console.log(
  //     `  ` + chalk.red(`this repo name ${TEMPLATE_NAME} is not exists.`)
  //   );
  //   return;
  // }
  // await clearConsole(true);
  log();
  try {
    logWithSpinner(`⠋`, `Download config file. This might take a while...`);
    tmpdir = await fetchRemotePreset(TEMPLATE_NAME, 'code-linting');
  } catch (e) {
    stopSpinner();
    error(`Failed fetching remote git repo ${chalk.cyan(TEMPLATE_NAME)};`);
    throw e;
  }
  const pkgJson = fs.readJsonSync(path.resolve(tmpdir, 'config.json'));
  let localJson;
  fs.ensureFileSync(path.resolve(cwd, 'package.json'));
  try {
    localJson = fs.readJsonSync(path.resolve(cwd, 'package.json'));
  } catch (error) {
    error(`Failed to read package.json file, file content is not null`);
    throw error;
  }
  const targetJson = _.merge(localJson, pkgJson);
  const remoteFiles = fs.readdirSync(tmpdir);
  const filesToDelete = remoteFiles.filter(
    filename => !noUsedFiles.includes(filename)
  );
  await writeFileTree(
    cwd,
    {
      'package.json': JSON.stringify(targetJson, null, 2)
    },
    filesToDelete
  );
  // 拷贝到项目文件下
  try {
    await deleteRemovedFiles(tmpdir, noUsedFiles);
    fs.copySync(tmpdir, cwd);
  } catch (error) {
    return console.error(chalk.red.dim(`Error: ${error}`));
  }
  stopSpinner();
  log();
  log(`🎉  Successfully download code linting config file.`);
  log();
}

module.exports = (...args) => {
  return addCodeLinting(...args).catch(err => {
    console.error(err);
    process.exit(1);
  });
};
