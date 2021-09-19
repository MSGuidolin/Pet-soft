import { Schema, model } from 'mongoose';

const AddressSchema = new Schema(
  {
    name: {
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
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address_1: {
      type: String,
      required: true,
      trim: true,
    },
    address_details: {
      type: String,
      trim: true,
    },
    zip_code: {
      type: String,
      required: true,
      trim: true,
    },
    is_main: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'Providers',
      // autopopulate: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      // autopopulate: true,
    },
  },
  { versionKey: false, timestamps: true }
);
AddressSchema.plugin(require('mongoose-autopopulate'));
export default model('Addresses', AddressSchema);
