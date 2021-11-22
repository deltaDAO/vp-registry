import { ethers, Transaction } from 'ethers'

import RecoverSigner from '../contracts/abi/RecoverSigner.json'
import vpRegistry from '../contracts/abi/vpRegistry.json'
import { logger } from '../utils/logger'

class RegistryService {
  gaiaxUrl = process.env.GAIAX_URL
  privateKey = process.env.Signer1PrivateKey
  contractAddress_Registry = process.env.ContractAddress_Registry
  contractAddress_RecoverSigner = process.env.ContractAddress_RecoverSigner
  MAX_GAS_LIMIT = process.env.MAX_GAS_LIMIT

  // Connect to the network
  provider = new ethers.providers.JsonRpcProvider(this.gaiaxUrl)
  // Connect to a wallet
  wallet = new ethers.Wallet(this.privateKey, this.provider)

  overrides = {
    gasLimit: this.MAX_GAS_LIMIT,
    gasPrice: ethers.utils.parseUnits('5', 'gwei')
  }

  public async register(senderAddress, fileHash, filePath): Promise<Transaction> {
    logger.log('info', `[ethers] Registering ${filePath} with the hash ${fileHash} to registry contract...`)

    const contract = new ethers.Contract(this.contractAddress_Registry, vpRegistry.abi, this.provider)
    const contractWithSigner = await contract.connect(this.wallet)
    logger.log('info', '[ethers] Awaiting tsx with:')
    logger.log('info', {
      senderAddress,
      fileHash,
      filePath,
      overrides: this.overrides
    })

    const tx = await contractWithSigner.registerVP(senderAddress, fileHash, filePath, this.overrides)

    logger.log('info', '[ethers] Created tsx entry:')
    logger.log('debug', tx)
    await tx.wait()
    logger.log('info', tx)
    return tx
  }

  public async recoverSigner(messageHash, signature): Promise<string | undefined> {
    const contract = new ethers.Contract(this.contractAddress_RecoverSigner, RecoverSigner.abi, this.provider)
    const contractWithSigner = await contract.connect(this.wallet)

    const signerAddress: string = await contractWithSigner.recoverSigner(messageHash, signature, this.overrides)
    const tx = await contractWithSigner.storeSigner(messageHash, signature, this.overrides)

    logger.log('info', '[ethers] Awaiting tsx with:')
    logger.log('info', {
      messageHash,
      signature,
      overrides: this.overrides
    })

    await tx.wait()

    logger.log('info', '[ethers] tsx result:')
    logger.log('info', signerAddress)

    return signerAddress
  }

  public async getAllEvents(): Promise<any[]> {
    const contract = new ethers.Contract(this.contractAddress_Registry, vpRegistry.abi, this.provider.getSigner(0))

    const eventFilter = contract.filters.vpRegistered()
    const events = await contract.queryFilter(eventFilter)

    return events
  }
}

export default RegistryService
