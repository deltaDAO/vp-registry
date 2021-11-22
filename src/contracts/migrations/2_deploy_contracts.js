const RecoverSigner = artifacts.require('RecoverSigner')

module.exports = async function (deployer) {
  deployer.deploy(RecoverSigner)
}
