import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IProvider extends Document {
  image: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: number;
  password: string;
  bio: string;
  age: number;
  googleId: string;
  roles: any[];
  hasCalendar: any;
  addresses: any[];
  services: any[];
  rating: any[];
  confirm: any;
  setImage(filename: any): void;
  comparePassword(password: string): Promise<boolean>;
}

const ProvidersSchema = new Schema<IProvider>(
  {
    image: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      trim: true,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    googleId: {
      type: String,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
        autopopulate: true,
      },
    ],

    hasCalendar: {
      type: Boolean,
      default: false,
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addresses",
        autopopulate: true,
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
        autopopulate: true,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

// encrypted user password
ProvidersSchema.pre<IProvider>("save", async function (next) {
  const provider = this;
  if (!provider.isNew || !provider.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(provider.password, salt);
  provider.password = hash;
  next();
});

ProvidersSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

ProvidersSchema.plugin(require("mongoose-autopopulate"));

export default model<IProvider>("Providers", ProvidersSchema);
