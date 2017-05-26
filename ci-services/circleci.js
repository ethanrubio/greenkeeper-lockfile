const _ = require('lodash')

const gitHelpers = require('../lib/git-helpers')

const config = require('../lib/config')

const env = process.env

function isFirstPush (branch) {
  const commitNumber = gitHelpers.getNumberOfCommitsOnBranch(branch)
  const commitMessage = gitHelpers.getCommitMessage().trim()

  if (
    commitNumber === 0 &&
    !_.includes(config.updateMessage, commitMessage)
  ) {
    return true
  }

  if (
    commitNumber === 1 &&
    _.includes(config.updateMessage, commitMessage)
  ) {
    return true
  }

  return false
}

module.exports = {
  repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
  branchName: env.CIRCLE_BRANCH,
  firstPush: isFirstPush(env.CIRCLE_BRANCH),
  correctBuild: _.isEmpty(env.CI_PULL_REQUEST),
  uploadBuild: env.CIRCLE_NODE_INDEX === '0'
}
