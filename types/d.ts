type NotificationType = {
  id: any;
  message: string;
  status: "success" | "failed" | "neutral" | "warning";
  type: "transactional" | "card" | "neutral";
  dateAdded: Date;
};

type FixedType = {
  id: any;
  name: string;
  startDate: number;
  endDate: number;
  amount: number;
  duration: number;
  status: "completed" | "running";
};
