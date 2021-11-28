export interface SsikitAuditorVerfifyResponse {
  valid: boolean
  policyResults: {
    [policyName: string]: boolean
  }
}

export interface VerifyResponse {
  verified: boolean
  message: string
}
