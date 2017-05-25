const _ = require('lodash')

const gitHelpers = require('../lib/git-helpers')

const env = process.env

function isFirstPush(branch, firstPushEnvironment) {
  console.log('outside', firstPushEnvironment);
  if (_.isEmpty(firstPushEnvironment)) {
    const firstPush = gitHelpers.getNumberOfCommitsOnBranch(branch) === 0;
    console.log('inside first push', firstPush);
    env.FIRST_PUSH = firstPush;
    return firstPush;
  }
  return firstPushEnvironment;
}

module.exports = {
  repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
  branchName: env.CIRCLE_BRANCH,
  firstPush: isFirstPush(env.CIRCLE_BRANCH, env.FIRST_PUSH),
  correctBuild: _.isEmpty(env.CI_PULL_REQUEST),
  uploadBuild: env.CIRCLE_NODE_INDEX === '0'
}
