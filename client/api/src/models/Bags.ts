import { Schema, model } from "mongoose";

const BagSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        reservations: {
            type: Array,
        },
    },
    { versionKey: false, timestamps: true }
)

export default model("Bags", BagSchema);