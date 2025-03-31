import mongoose, { Schema, Document } from "mongoose";

interface IAccount extends Document {
  uid: string;
  name: string;
  pin: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const accountSchema: Schema = new Schema<IAccount>(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account =
  mongoose.models.Account || mongoose.model<IAccount>("Account", accountSchema);

export default Account;
