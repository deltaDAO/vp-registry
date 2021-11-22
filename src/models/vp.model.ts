import { Document, model, Schema } from 'mongoose'

import { VP } from '../interfaces/vp.interface'

const vpSchema: Schema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

const vpModel = model<VP & Document>('VP', vpSchema)

export default vpModel
