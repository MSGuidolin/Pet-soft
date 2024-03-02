import { Schema, model } from 'mongoose';

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
    },    
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip_code: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'Providers',
      // autopopulate: true,
    },
  },
  { versionKey: false, timestamps: true }
);
AddressSchema.plugin(require('mongoose-autopopulate'));
export default model('Addresses', AddressSchema);
