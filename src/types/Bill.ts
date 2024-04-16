export interface Bill {
  status: string;
  message: string;
  data: BillData[];
  code: number;
}

export interface BillData {
  id: number;
  meterId: number;
  refNumber: string;
  penaltyPercentage: string;
  fromDate: Date;
  toDate: Date;
  rateUponReading: string;
  kwConsumes: string;
  readingDate: Date;
  dueDate: Date;
  billDeleted: boolean;
  billPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  readableFromDate: string;
  readableToDate: string;
  readabledueDate: string;
  readableReadingDate: string;
  amountDue: string;
  totalAmountToPay: string;
}
