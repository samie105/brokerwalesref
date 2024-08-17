type NotificationType = {
  id: number;
  message: string;
  status: "success" | "failed" | "neutral" | "warning";
  type: "transactional" | "card" | "neutral";
  dateAdded: Date;
};
