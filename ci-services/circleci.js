const _ = require('lodash')

const gitHelpers = require('../lib/git-helpers')

const env = process.env

function isFirstPush() {
  console.log('outside', env.firstPush);
  if (_.isEmpty(env.firstPush)) {
    const firstPush = gitHelpers.getNumberOfCommitsOnBranch(env.CIRCLE_BRANCH) === 1;
    console.log('inside first push', firstPush);
    env.firstPush = firstPush;
    return firstPush;
  }
  return env.firstPush;
}

module.exports = {
  repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
  branchName: env.CIRCLE_BRANCH,
  firstPush: isFirstPush(),
  correctBuild: _.isEmpty(env.CI_PULL_REQUEST),
  uploadBuild: env.CIRCLE_NODE_INDEX === '0'
}
