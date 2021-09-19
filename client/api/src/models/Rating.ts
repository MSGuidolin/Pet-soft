import { Schema, model } from "mongoose";

const RatingSchema = new Schema(
  {
    assessment: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
      max: 5,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Providers",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  },
  { versionKey: false, timestamps: true }
);
RatingSchema.plugin(require("mongoose-autopopulate"));
export default model("Rating", RatingSchema);
