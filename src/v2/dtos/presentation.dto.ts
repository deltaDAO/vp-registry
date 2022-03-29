export interface Root {
  auth_token: string
  id_token_valid: boolean
  isValid: boolean
  request: Request
  state: string
  subject: string
  verification_result: VerificationResult
  vp_token: VpToken2
}

export interface Request {
  claims: Claims
  nonce: string
  redirect_uri: string
  response_mode: string
  state: string
}

export interface Claims {
  vp_token: VpToken
}

export interface VpToken {
  presentation_definition: PresentationDefinition
}

export interface PresentationDefinition {
  id: string
  input_descriptors: InputDescriptor[]
}

export interface InputDescriptor {
  id: string
  schema: Schema
}

export interface Schema {
  uri: string
}

export interface VerificationResult {
  policyResults: PolicyResults
  valid: boolean
}

export interface PolicyResults {
  SignaturePolicy: boolean
  ChallengePolicy: boolean
  VpTokenClaimPolicy: boolean
}

export interface VpToken2 {
  '@context': string[]
  holder: string
  id: string
  proof: Proof
  type: string[]
  verifiableCredential: VerifiableCredential[]
}

export interface Proof {
  created: string
  creator: string
  domain: string
  jws: string
  nonce: string
  proofPurpose: string
  type: string
  verificationMethod: string
}

export interface VerifiableCredential {
  '@context': string[]
  credentialSchema: CredentialSchema
  credentialStatus: CredentialStatus
  credentialSubject: CredentialSubject
  id: string
  issued: string
  issuer: string
  proof: Proof2
  validFrom: string
  issuanceDate: string
  type: string[]
}

export interface CredentialSchema {
  id: string
  type: string
}

export interface CredentialStatus {
  id: string
  type: string
}

export interface CredentialSubject {
  ethereumAddress: string
  hasCountry: string
  hasJurisdiction: string
  hasLegallyBindingName: string
  hasRegistrationNumber: string
  id: string
  leiCode: string
  parentOrganisation: string
  subOrganisation: string
}

export interface Proof2 {
  created: string
  creator: string
  domain: string
  jws: string
  nonce: string
  type: string
}
