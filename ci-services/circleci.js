const _ = require('lodash')

const gitHelpers = require('../lib/git-helpers')

const env = process.env

function isFirstPush(branch) {
  const commitNumber = gitHelpers.getNumberOfCommitsOnBranch(branch);
  if (commitNumber === 0) {
    return true;
  }
  return commitNumber === 1 && 
    gitHelpers.getCommitMessage() === "chore(package): update lockfile\n\nhttps://npm.im/greenkeeper-lockfile";
}

module.exports = {
  repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
  branchName: env.CIRCLE_BRANCH,
  firstPush: isFirstPush(env.CIRCLE_BRANCH),
  correctBuild: _.isEmpty(env.CI_PULL_REQUEST),
  uploadBuild: env.CIRCLE_NODE_INDEX === '0'
}
