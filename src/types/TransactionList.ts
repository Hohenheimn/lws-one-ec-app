export interface TransactionList {
  status: string;
  message: string;
  data: TransactionListData[];
  code: number;
}

export interface TransactionListData {
  id: number;
  collectorId: null;
  userId: number;
  billId: number;
  paymentAmount: string;
  paymentPosted: boolean;
  paymentMedium: string;
  referenceNumber: string;
  createdAt: Date;
  updatedAt: Date;
  bill: Bill;
  user: User;
  collector: null;
}

export interface Bill {
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
}

export interface User {
  id: number;
  userLname: string;
  userFname: string;
  userMname: string;
  userEmail: string;
  userContact: string;
  userDob: Date;
  userCustomerNumber: string;
  userDeleted: boolean;
  userPassword: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}
