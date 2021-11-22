import { NextFunction, Request, Response } from 'express'
import SignatureService from '../services/signature.service'

class SignatureController {
  signatureService = new SignatureService()

  public getMessageToSign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.signatureService.createMessageToSign()
      res.status(200).json({ data: message, message: 'created' })
    } catch (error) {
      next(error)
    }
  }
}

export default SignatureController
