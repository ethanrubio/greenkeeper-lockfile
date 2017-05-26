const _ = require("lodash")

const gitHelpers = require("../lib/git-helpers")

const env = process.env

function isFirstPush(branch, firstPush) {
  const commitNumber = gitHelpers.getNumberOfCommitsOnBranch(branch)
  const commitMessage = gitHelpers.getCommitMessage().trim()
  if (
    commitNumber === 0 &&
    commitMessage !== "chore(package): update lockfile"
  ) {
    env.FIRST_PUSH = true
    return true
  }
  return env.FIRST_PUSH || false
}

module.exports = {
  repoSlug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
  branchName: env.CIRCLE_BRANCH,
  firstPush: isFirstPush(env.CIRCLE_BRANCH, env.FIRST_PUSH),
  correctBuild: _.isEmpty(env.CI_PULL_REQUEST),
  uploadBuild: env.CIRCLE_NODE_INDEX === "0"
}
