export interface PenaltyResponse {
    list: IPenaltyData[];
    total: number;
    size: number;
  }
  
  export interface IPenaltyData {
    id: number;
    idCtzUser: number;
    idPenaltyType?: string;
    idAdmUser?: number;
    idBicycleHistory: number;
    description: string;
    issuedDate: string;
    resolvedDate: string;
    tsi: string;
    tsu: string;
  }