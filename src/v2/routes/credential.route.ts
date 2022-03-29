import { Router } from 'express'
import { Routes } from '../../interfaces/routes.interface'
import CredentialController from '../controllers/credential.controller'

class CredentialRoute implements Routes {
  public path = '/api/v2/credential'
  public router = Router()
  public credentialController = new CredentialController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/challenge`, this.credentialController.getChallenge)
    this.router.post(`${this.path}/claim`, this.credentialController.claimPresentation)
    this.router.get(`${this.path}/verify`, this.credentialController.verify)
  }
}

export default CredentialRoute
