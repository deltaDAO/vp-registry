import axios from 'axios'
import { SsikitAuditorVerfifyResponse, VerifyResponse } from '../interfaces/verification.interface'
import VerifyResonse from '../models/VerifyResponse.model'
import { logger } from '../utils/logger'

class VerificationService {
  public static readonly verificationPolicies = ['JsonSchemaPolicy']
  public async verifyVp(vpFileUrl: string): Promise<VerifyResponse> {
    if (!vpFileUrl) return new VerifyResonse(false, 'No valid VP!').make()

    const auditorUri = `${process.env.SSIKIT_AUDITOR_URI}/v1/verify?policyList=${encodeURIComponent(
      VerificationService.verificationPolicies.join(',')
    )}`

    return axios
      .get(vpFileUrl)
      .then(jsonResponse => {
        logger.log('info', `Requesting verification at ${auditorUri}`)
        return axios
          .post(auditorUri, jsonResponse.data)
          .then(res => {
            logger.log('info', `Got response for vp verification from ${auditorUri}`, res.data)

            const isVerifiedByAuditor = this.isVerifiedByAuditor(res.data)

            if (isVerifiedByAuditor) return new VerifyResonse(true, 'JSON-LD for VP was verified by Auditor!').make()

            return new VerifyResonse(false, 'JSON-LD for VP could not be verified by Auditor.').make()
          })
          .catch(error => {
            logger.error('Error requesting SSIKIT Auditor API:')
            logger.error(error)
            return new VerifyResonse(false, `JSON-LD could not be validated.`).make()
          })
      })
      .catch(error => {
        // TODO error handling for not reachable service
        logger.error('Error requesting VP JSON file:')
        logger.error(error)
        return new VerifyResonse(false, 'JSON-LD cannot be loaded from url.').make()
      })
  }

  private isVerifiedByAuditor(auditorResponse: SsikitAuditorVerfifyResponse): boolean {
    return auditorResponse.overallStatus
  }
}

export default VerificationService
