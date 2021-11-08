import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

roleSchema.plugin(require('mongoose-autopopulate'));
export default model('Role', roleSchema);
