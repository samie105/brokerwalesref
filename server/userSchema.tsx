// userModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  dob?: string;
  motherMaidenName?: string;
  ssn?: string;
  password: string;
  codeVerification: boolean;
  paymentVerification: boolean;
  paymentImageLink: string;
  bankAccountNumber: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: String },
  motherMaidenName: { type: String },
  ssn: { type: String },
  password: { type: String, required: true },
  codeVerification: { type: Boolean, required: true },
  paymentVerification: { type: Boolean, required: true },
  paymentImageLink: { type: String, required: true },
  bankAccountNumber: { type: String, required: true, unique: true },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
