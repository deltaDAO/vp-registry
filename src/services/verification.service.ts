import axios from 'axios'
import { SsikitAuditorVerfifyResponse, VerifyResponse } from '../interfaces/verification.interface'
import VerifiedResponse from '../models/VerifyResponse.model'
import { logger } from '../utils/logger'

class VerificationService {
  public static readonly verificationPolicies = ['JsonSchemaPolicy']

  public async verifyVp(vpFileUrl: string, matchAccount?: string): Promise<VerifyResponse> {
    if (!vpFileUrl) return new VerifiedResponse(false, 'No valid VP!').make()

    const auditorUri = `${process.env.SSIKIT_AUDITOR_URI}/v1/verify?policyList=${encodeURIComponent(
      VerificationService.verificationPolicies.join(',')
    )}`

    try {
      const jsonResponse = await axios.get(vpFileUrl)
      logger.log('info', `Requesting verification at ${auditorUri}`)

      const json = jsonResponse.data
      if (matchAccount) {
        const matching = this.isAccountMatchingVp(matchAccount, json)
        if (!matching) return new VerifiedResponse(false, 'Account does not match ethereumAddress in VP.').make()
      }

      const auditorResponse = await axios.post(auditorUri, jsonResponse.data)

      logger.log('info', `Got response for vp verification from ${auditorUri}`)

      const isVerifiedByAuditor = this.isVerifiedByAuditor(auditorResponse.data)

      if (isVerifiedByAuditor) return new VerifiedResponse(true, 'JSON-LD for VP was verified by Auditor!').make()

      return new VerifiedResponse(false, 'JSON-LD for VP could not be verified by Auditor.').make()
    } catch (error) {
      // TODO error handling for not reachable service
      logger.error('Error verifying VP JSON file:')
      logger.error(error)
      return new VerifiedResponse(false, 'JSON-LD could not be validated.').make()
    }
  }

  private isVerifiedByAuditor(auditorResponse: SsikitAuditorVerfifyResponse): boolean {
    return auditorResponse.valid
  }

  public isAccountMatchingVp(address: string, vp: any): boolean {
    return vp.credentialSubject?.ethereumAddress?.id === address
  }
}

export default VerificationService
