import { Router } from 'express'
import SignatureController from '../controllers/signature.controller'
import { Routes } from '../interfaces/routes.interface'

class SignatureRoute implements Routes {
  public path = '/signature'
  public router = Router()
  public signatureController = new SignatureController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/message`, this.signatureController.getMessageToSign)
  }
}

export default SignatureRoute
