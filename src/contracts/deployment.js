import { ethers } from 'ethers'

const gaiaxUrl = process.env.GAIAX_URL
const privateKey = process.env.Signer1PrivateKey
const provider = new ethers.providers.JsonRpcProvider(gaiaxUrl)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deployContract() {
  const bytecode = ''
  const wallet = new ethers.Wallet(privateKey, provider)
  const factory = new ethers.ContractFactory(abi, bytecode, wallet)
  const contract = await factory.deploy()
  // The address the Contract WILL have once mined
  console.log(contract.address, contract.deployTransaction.hash)
  // Wait until contract is mined. It is not deployed yet.
  await contract.deployed()
}
