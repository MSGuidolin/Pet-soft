import { Schema, model } from 'mongoose';

const PetSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        animal: {
            type: String,
            required: true,
        },
        race: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },

        image: {
            data: Buffer,
            contentType: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

PetSchema.plugin(require('mongoose-autopopulate'));

export default model('Pets', PetSchema);
