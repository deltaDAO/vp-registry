import { HttpException } from '../../exceptions/HttpException'
import { isEmpty } from '../../utils/util'
import { VpToken2 } from '../dtos/presentation.dto'
import presentationModel from '../models/presentation.model'

class PresentationService {
  public async createPresentation(presentationDto: VpToken2): Promise<{ token: string }> {
    if (isEmpty(presentationDto)) throw new HttpException(400, 'Not a valid address.')

    try {
      const createPresentation = await presentationModel.create(presentationDto)

      return { token: createPresentation._id }
    } catch {
      throw new HttpException(500, 'Could not create presentation.')
    }
  }
}

export default PresentationService
