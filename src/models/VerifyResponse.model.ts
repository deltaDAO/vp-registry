import { VerifyResponse } from '../interfaces/verification.interface'
import { isEmpty } from '../utils/util'

class VerifiedResponse {
  private verified: boolean
  private message: string

  constructor(verified: boolean, message?: string) {
    this.verified = verified
    if (!isEmpty(message)) this.message = message
  }

  public make(): VerifyResponse {
    return {
      verified: this.verified,
      message: this.message || ''
    }
  }
}

export default VerifiedResponse
