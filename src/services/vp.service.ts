import { HttpException } from '../exceptions/HttpException'
import { VP } from '../interfaces/vp.interface'
import vpModel from '../models/vp.model'
import { isEmpty } from '../utils/util'

class VpService {
  public vps = vpModel

  public async findVpByAddress(address: string): Promise<VP> {
    if (isEmpty(address)) throw new HttpException(400, 'Not a valid address.')

    const findVp: VP = await this.vps.findOne({ address: address })

    if (!findVp) throw new HttpException(409, 'VP does not exist.')

    return findVp
  }

  public async registerVp(vpData: Partial<VP>): Promise<VP> {
    if (isEmpty(vpData)) throw new HttpException(400, 'No valid vp data.')

    const query = { address: vpData.address.toLowerCase() }
    const update = { ...vpData, address: vpData.address.toLowerCase() }
    const options = { new: true, upsert: true }

    const createVpData: VP = await this.vps.findOneAndUpdate(query, update, options)

    return createVpData
  }
}

export default VpService
