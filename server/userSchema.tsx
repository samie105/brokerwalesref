// userModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Define missing interfaces
export interface FixedType {
  id: any;
  roi: number;
  totalReturn: number;
  name: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  duration: number;
  status: "completed" | "running";
}

export interface NotificationType {
  id: any;
  message: string;
  status: "success" | "failed" | "neutral" | "warning";
  type: "transactional" | "card" | "neutral";
  dateAdded: Date;
}

export interface Deposits {
  id: any;
  amount: number;
  paymentMeans: "mobile deposit" | "check";
  status: "failed" | "success" | "pending";
  date: Date;
  screenshotLink: string;
}

export interface Transfers {
  id: any;
  recipientName: string;
  amount: number;
  date: Date;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  status: "success" | "failed" | "pending";
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
  notifications: [
    {
      id: { type: Schema.Types.Mixed },
      message: { type: String },
      status: {
        type: String,
        enum: ["success", "failed", "neutral", "warning"],
      },
      type: { type: String, enum: ["transactional", "card", "neutral"] },
      dateAdded: { type: Date },
    },
  ],
  readNotification: { type: Boolean, default: false },
  card: Object,
  cardBalance: { type: Number },
  accountBalance: { type: Number },
  fixedBalance: { type: Number },
  accountLimit: { type: Number },
  role: { type: String },
  isPaidOpeningDeposit: { type: Boolean },
  accountType: { type: String },
  fixedHistory: [
    {
      id: { type: Schema.Types.Mixed },
      roi: { type: Number },
      totalReturn: { type: Number },
      name: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      amount: { type: Number },
      duration: { type: Number },
      status: { type: String, enum: ["completed", "running"] },
    },
  ],
  depositHistory: [
    {
      id: { type: Schema.Types.Mixed },
      amount: { type: Number },
      paymentMeans: { type: String, enum: ["mobile deposit", "check"] },
      status: { type: String, enum: ["failed", "success", "pending"] },
      date: { type: Date },
      screenshotLink: { type: String },
    },
  ],
  transferHistory: [
    {
      id: { type: Schema.Types.Mixed },
      recipientName: { type: String },
      amount: { type: Number },
      date: { type: Date },
      receipientAccountNumber: { type: Number },
      receipientRoutingNumber: { type: Number },
      status: { type: String, enum: ["success", "failed", "pending"] },
      receipientBankName: { type: String },
    },
  ],
  transactionPin: { type: Number },
  profilePictureLink: { type: String },
  verificationDetails: { type: Object },
  accountVerified: { type: Boolean },
});

const User: Model<IUser> =
  mongoose.models.UserWalesRef ||
  mongoose.model<IUser>("UserWalesRef", userSchema);

export default User;
