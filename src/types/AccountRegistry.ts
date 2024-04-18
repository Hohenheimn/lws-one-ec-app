export interface AccountRegistry {
  status: string;
  message: string;
  data: {
    arDeleted: boolean;
    id: number;
    meterId: any;
    meterAccount: {
      coopId: number;
      coorDeleted: boolean;
      createdAt: string;
      id: number;
      meterAccountName: string;
      meterConnected: boolean;
      meterDeleted: boolean;
      meterNumber: string;
      updatedAt: string;
      coop: {
        coopDeleted: boolean;
        coopDescription: string;
        coopName: string;
        createdAt: string;
        id: number;
        scope: string;
        updatedAt: string;
      };
    };
  }[];
  code: number;
}
