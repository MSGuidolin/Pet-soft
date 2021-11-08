import { Schema, model } from 'mongoose';

const PetSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        race: {
            type: String,
        },
        age: {
            type: Number,
        },
        animal: {
            type: String,
        },
        image: {
            data: Buffer,
            contentType: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { versionKey: false, timestamps: true }
);

PetSchema.plugin(require('mongoose-autopopulate'));

export default model('Pets', PetSchema);
