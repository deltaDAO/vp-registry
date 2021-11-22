import { randomBytes } from 'crypto'
import { ethers } from 'ethers'

import { SignatureMessage } from 'interfaces/signature.interface'

class SignatureService {
  gaiaxUrl = process.env.GAIAX_URL

  provider = new ethers.providers.JsonRpcProvider(this.gaiaxUrl)

  public async createMessageToSign(): Promise<SignatureMessage> {
    const token = randomBytes(64).toString('hex')
    const messageHash = ethers.utils.id(token)

    return {
      message: messageHash
    }
  }
}

export default SignatureService
