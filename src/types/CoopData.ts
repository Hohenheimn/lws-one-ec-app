export interface CoopData {
  status: string;
  message: string;
  data: Data[];
  code: number;
}

export interface Data {
  id: number;
  coopName: string;
  coopDescription: string;
  coopDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  scope: null;
  address: Address[];
}

export interface Address {
  id: number;
  coopId: number;
  coopProvince: string;
  coopTown: string;
  coopBrgy: string;
  coopSt: string;
  coopBuildingNumber: number;
  coopUnitDetails: string;
  coopDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  scope: null;
}
