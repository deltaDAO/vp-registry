import { NextFunction, Request, Response } from 'express'
import { add } from 'winston'
import RegistryService from '../../services/registry.service'
import CredentialService from '../services/credential.service'

class CredentialController {
  private credentialService = new CredentialService()
  private registryService = new RegistryService()

  public getChallenge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body
      const data = await this.credentialService.getChallenge(token)
      res.status(200).json({ data: data, message: 'Challenge created' })
    } catch (error) {
      next(error)
    }
  }

  public claimPresentation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, signedMessage, address } = req.body

      const data = await this.credentialService.claimPresentation(token, signedMessage, address)
      res.status(200).json({ data: data, message: 'Challenge created' })
    } catch (error) {
      next(error)
    }
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address } = req.query

      const data = await this.credentialService.verifyCredential(address as string)
      res.status(200).json({ data: data, message: `Credential ${data.valid ? 'found' : 'not found'}.` })
    } catch (error) {
      next(error)
    }
  }
}

export default CredentialController
