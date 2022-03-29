import { Document, model, Schema } from 'mongoose'
import { VpToken2 } from '../dtos/presentation.dto'

const presentationSchema: Schema = new Schema(
  {
    '@context': [String],
    holder: String,
    id: String,
    proof: Object,
    type: [String],
    verifiableCredential: [Object]
  },
  {
    timestamps: true
  }
)

const presentationModel = model<VpToken2 & Document>('Presentation', presentationSchema)

export default presentationModel
