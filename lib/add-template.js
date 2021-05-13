const chalk = require('chalk');
const { stopSpinner } = require('./util/spinner');
const { log } = require('./util/logger');
const {
  readTemplateJson,
  writeTemplateJson
} = require('./util/readTemplateData');
const { registry } = require('./util/env');
const getPackageTarball = require('./util/getPackageTarball');
const repoDesc = {
  name: '',
  gitlab: ''
};

async function addProjectTemplate(templateName, repoName) {
  const templateGitRepoJson = readTemplateJson();
  if (templateGitRepoJson[templateName]) {
    console.log(`  ` + chalk.red(`template name ${templateName} has exists.`));
    return;
  }
  // const tarball = await getPackageTarball(repoName);
  // if (!tarball) {
  //   console.log(`  ` + chalk.red(`this repo name ${repoName} is not exists.`));
  //   return;
  // }
  repoDesc.name = repoName;
  repoDesc.gitlab = `${registry}/web/${repoName}.git`;
  templateGitRepoJson[templateName] = repoDesc;
  writeTemplateJson(templateGitRepoJson);
  stopSpinner();
  log();
  log(`🎉  Successfully add project template ${chalk.yellow(templateName)}.`);
  log();
}

module.exports = (...args) => {
  return addProjectTemplate(...args).catch(err => {
    console.error(err);
    process.exit(1);
  });
};
