import { Transaction } from 'ethers'
import { NextFunction, Request, Response } from 'express'

import { CreateVpDto } from '../dtos/vp.dto'
import { HttpException } from '../exceptions/HttpException'
import { VerifyResponse } from '../interfaces/verification.interface'
import { VP } from '../interfaces/vp.interface'
import RegistryService from '../services/registry.service'
import VerificationService from '../services/verification.service'
import VpService from '../services/vp.service'
import { hashJsonAtUrl } from '../utils/util'

class VpController {
  public vpService = new VpService()
  public verificationService = new VerificationService()
  public registryService = new RegistryService()

  constructor() {
    console.log(`construct vp controller`)
  }

  public getVpByAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = VpController.getRequestAddress(req)
      const findOneVpData: VP = await this.vpService.findVpByAddress(address)

      res.status(200).json({ data: findOneVpData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public registerVp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vpData: CreateVpDto = req.body
      const verification = await this.verificationService.verifyVp(vpData.fileUrl)

      if (!verification.verified) {
        // TODO adjust message for error handling from verification service
        next(new HttpException(400, 'Verifiable Presentation invalid'))
        return
      }

      const address: string | undefined = await this.registryService.recoverSigner(vpData.hashedMessage, vpData.signature)

      if (address === undefined) {
        next(new HttpException(400, 'Signature does not match with hashed message'))
        return
      }

      const hash = await hashJsonAtUrl(vpData.fileUrl)

      const transaction: Transaction = await this.registryService.register(address, hash, vpData.fileUrl)

      const createVP: Partial<VP> = {
        ...vpData,
        transactionHash: transaction.hash,
        address
      }

      const createVpData: VP = await this.vpService.registerVp(createVP)

      res.status(201).json({ data: createVpData, message: 'created' })
    } catch (error) {
      next(error)
    }
  }

  public verifyVp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = VpController.getRequestAddress(req)
      const findOneVpData: VP = await this.vpService.findVpByAddress(address)
      const verifyResponseData: VerifyResponse = await this.verificationService.verifyVp(findOneVpData.fileUrl)

      res.status(200).json({ data: verifyResponseData, message: 'verification' })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Helper functions
   */

  private static getRequestAddress(req: Request): string {
    return req.params.address.toLowerCase()
  }
}

export default VpController
