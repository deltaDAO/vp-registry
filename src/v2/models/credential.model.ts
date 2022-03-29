import { Document, model, Schema } from 'mongoose'
import { Credential } from '../dtos/credential.dto'

const credentialSchema: Schema = new Schema(
  {
    presentationId: String,
    ethAddress: String
  },
  {
    timestamps: true
  }
)

const credentialModel = model<Credential & Document>('Credential', credentialSchema)

export default credentialModel
