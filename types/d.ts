type NotificationType = {
  id: any;
  message: string;
  status: "success" | "failed" | "neutral" | "warning";
  type: "transactional" | "card" | "neutral";
  dateAdded: Date;
};

type FixedType = {
  id: any;
  roi: number;
  totalReturn: number;
  name: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  duration: number;
  status: "completed" | "running";
};

type Transfers = {
  id: any;
  recipientName: string;
  amount: number;
  date: Date;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  status: "success" | "failed" | "pending";
  receipientBankName: string;
};
type Deposits = {
  id: any;
  amount: number;
  paymentMeans: "mobile deposit" | "check";
  status: "failed" | "success" | "pending";
  date: Date;
  screenshotLink: string;
};

type verificationDetails = {
  verificationType: string;
  verificationImageLinkFront: string;
  verificationImageLinkBack: string;
  status: "pending" | "success" | "failed" | "none";
};

// Declaration file for modules without TypeScript definitions

// For @hookform/resolvers/zod
declare module "@hookform/resolvers/zod" {
  import { ZodSchema } from "zod";

  export function zodResolver(schema: ZodSchema): any;
}
