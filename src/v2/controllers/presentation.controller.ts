import { NextFunction, Request, Response } from 'express'
import PresentationService from '../services/presentation.service'

class PresentationController {
  presentationService = new PresentationService()

  public createPresentation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { vp_token } = req.body
      const data = await this.presentationService.createPresentation(vp_token)
      res.status(200).json({ data: data, message: 'Presentation created' })
    } catch (error) {
      next(error)
    }
  }
}

export default PresentationController
