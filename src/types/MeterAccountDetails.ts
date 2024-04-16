export interface MeterAccountDetails {
  status: string;
  message: string;
  data: Data;
  code: number;
}

export interface Data {
  id: number;
  coopId: number;
  meterNumber: string;
  meterAccountName: string;
  meterConnected: boolean;
  meterDeleted: boolean;
  coorDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  meterAddress: MeterAddress[];
  coop: Coop;
}

export interface Coop {
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

export interface MeterAddress {
  id: number;
  meterId: number;
  meterProvince: string;
  meterTown: string;
  meterBrgy: string;
  meterSt: string;
  meterPostNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
