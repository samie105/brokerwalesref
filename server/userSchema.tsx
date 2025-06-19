// userModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Define missing interfaces
export interface FixedType {
  id: string;
  name: string;
  amount: number;
  status: string;
  duration: number;
  roi: number;
  totalReturn: number;
  startDate: string | Date;
  endDate: string | Date;
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string | Date;
  read: boolean;
}

export interface Deposits {
  id: string;
  amount: number;
  date: string | Date;
  method: string;
  status: "failed" | "success" | "pending";
  reference: string;
  screenshotLink: string;
  paymentMeans: "mobile deposit" | "check" | string;
}

export interface Transfers {
  id: string;
  amount: number;
  date: string | Date;
  recipient: string;
  status: "success" | "failed" | "pending";
  reference: string;
  recipientName: string;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  receipientBankName: string;
}

export interface verificationDetails {
  documentType: string;
  documentNumber: string;
  verificationDate: string | Date;
  verified: boolean;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  motherMaidenName: string;
  ssn: string;
  password: string;
  codeVerification: boolean;
  paymentVerification: boolean;
  paymentImageLink: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  notifications: NotificationType[];
  readNotification: boolean;
  card: {
    cardNumber: string;
    cardExpiry: string;
    cardType: string;
    cardCVC: string;
    cardBillingAddress: string;
    cardZipCode: string;
  };
  cardBalance: number;
  accountBalance: number;
  fixedBalance: number;
  accountLimit: number;
  isPaidOpeningDeposit: boolean;
  fixedHistory: FixedType[];
  role: string;
  accountType: "savings" | "checking";
  depositHistory: Deposits[];
  transferHistory: Transfers[];
  transactionPin: number;
  profilePictureLink: string;
  accountVerified: boolean;
  verificationDetails: verificationDetails;
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
  bankRoutingNumber: { type: String, required: true, unique: true },
  notifications: [Object],
  readNotification: { type: Boolean, default: false },
  card: Object,
  cardBalance: { type: Number },
  accountBalance: { type: Number },
  fixedBalance: { type: Number },
  accountLimit: { type: Number },
  role: { type: String },
  isPaidOpeningDeposit: { type: Boolean },
  accountType: { type: String },
  fixedHistory: [Object],
  depositHistory: [Object],
  transferHistory: [Object],
  transactionPin: { type: Number },
  profilePictureLink: { type: String },
  verificationDetails: { type: Object },
  accountVerified: { type: Boolean },
});

const User: Model<IUser> =
  mongoose.models.UserWalesRef ||
  mongoose.model<IUser>("UserWalesRef", userSchema);

export default User;
