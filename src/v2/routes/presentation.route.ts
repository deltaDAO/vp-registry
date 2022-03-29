import { Router } from 'express'
import { Routes } from '../../interfaces/routes.interface'
import PresentationController from '../controllers/presentation.controller'

class PresentationRoute implements Routes {
  public path = '/api/v2/presentation'
  public router = Router()
  public presentationController = new PresentationController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.presentationController.createPresentation)
  }
}

export default PresentationRoute
