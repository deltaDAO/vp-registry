export interface SsikitAuditorVerfifyResponse {
  overallStatus: boolean
  policyResults: {
    [policyName: string]: boolean
  }
}

export interface VerifyResponse {
  verified: boolean
  message: string
}
