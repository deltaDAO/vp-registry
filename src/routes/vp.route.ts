import { Router } from 'express'
import VpController from '../controllers/vp.controller'
import { CreateVpDto } from '../dtos/vp.dto'
import { Routes } from '../interfaces/routes.interface'
import validationMiddleware from '../middlewares/validation.middleware'

class VpRoute implements Routes {
  public path = '/vp'
  public router = Router()
  public vpController = new VpController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:address`, this.vpController.getVpByAddress)
    this.router.post(`${this.path}`, validationMiddleware(CreateVpDto, 'body'), this.vpController.registerVp)
    this.router.get(`${this.path}/:address/verify`, this.vpController.verifyVp)
  }
}

export default VpRoute
