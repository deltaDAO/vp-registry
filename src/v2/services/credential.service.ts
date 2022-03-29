import { ethers } from 'ethers'
import { HttpException } from '../../exceptions/HttpException'
import RegistryService from '../../services/registry.service'
import { isEmpty } from '../../utils/util'
import { Credential } from '../dtos/credential.dto'
import { VpToken2 } from '../dtos/presentation.dto'
import credentialModel from '../models/credential.model'
import presentationModel from '../models/presentation.model'

class CredentialService {
  private registryService = new RegistryService()

  public async getChallenge(token: string): Promise<{ challenge: string }> {
    if (isEmpty(token)) throw new HttpException(400, 'Token is empty.')
    const findPresentation = await presentationModel.findById(token)
    if (!findPresentation) throw new HttpException(404, 'Could not find a presentation for given token.')

    try {
      const challenge = this.getChallengeFromPresentation(findPresentation)
      return { challenge }
    } catch {
      throw new HttpException(500, 'Could not create challenge.')
    }
  }

  public async claimPresentation(token: string, signedMessage: string, address: string): Promise<{ credential: Credential }> {
    if (isEmpty(token) || isEmpty(address) || isEmpty(signedMessage)) throw new HttpException(400, 'Parameters cannot be empty.')

    try {
      const findPresentation = await presentationModel.findById(token)
      if (!findPresentation) throw new HttpException(403, 'No presentation found for given token.')

      const challenge = this.getChallengeFromPresentation(findPresentation)

      const recoveredAddress: string | undefined = await this.registryService.recoverSigner(challenge, signedMessage)
      if (address === undefined || address !== recoveredAddress) throw new HttpException(403, 'Address does not match')

      const credential = await credentialModel.create({ ethAddress: recoveredAddress, presentationId: findPresentation.id })
      await presentationModel.deleteOne({ _id: findPresentation._id })

      return { credential: { ethAddress: credential.ethAddress, presentationId: credential.presentationId } }
    } catch (error) {
      throw new HttpException(error.status || 500, error.message || 'Something went wrong')
    }
  }

  public async verifyCredential(address: string): Promise<{ valid: boolean }> {
    if (isEmpty(address)) throw new HttpException(400, 'Address is empty.')

    try {
      const findCredential = await credentialModel.findOne({ ethAddress: address })

      return { valid: findCredential.ethAddress === address }
    } catch (error) {
      return { valid: false }
    }
  }

  private getChallengeFromPresentation(presentation: VpToken2): string {
    const presentationHex = presentation.toString()
    const challenge = ethers.utils.id(presentationHex)

    return challenge
  }
}

export default CredentialService
