import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  image: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: number;
  password: string;
  googleId: string;
  roles: any[];
  event: any[];
  addresses: any[];
  creditCards: any[];
  rating: any[];
  confirm:any;
  setImage(filename: any): void;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
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

      enum: ['Male', 'Female', 'Non-binary'],
      default: 'Non-binary',

    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
      default: 1234,
    },
    confirm:{
      type: Boolean, 
      default: false,
        },
    password: {
      type: String,
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
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Events",
      },
    ],
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addresses",
        autopopulate: true,
      },
    ],
    creditCards: [
      {
        type: Schema.Types.ObjectId,
        ref: "CreditCards",
        autopopulate: true,
      },
    ],
  },

  { versionKey: false, timestamps: true }
  // versionKey para quitar el anuncio molesto de mongodb y timestamps para  saber cuando fue creado y cuando fue actualizado
);

//save image user as url
// UserSchema.methods.setImage = function setImage(filename) {
//   (this as IUser).image = `http://localhost:3002/uploads/${filename}`;
// };

// encrypted user password
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isNew || !user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.plugin(require("mongoose-autopopulate")); // codigo para usar mongoose autopopulate

export default model<IUser>("Users", UserSchema); // la funcion model recibe 2 parametros el primero en nombre del modelo y el segundo el schema
