export interface PenaltyResponse {
  list: IPenaltyData[];
  total: number;
  size: number;
}

export interface IPenaltyData {
  id: number;
  idCtzUser: number;
  idPenaltyType: number;
  idAdmUser: number;
  idBicycleHistory: number;
  description: string;
  issuedDate: string;
  resolvedDate: string;
  tsi: string;
  tsu: string;
}

export interface IPenaltyAdd {
  idCtzuser: number;
  idPenaltyType: number;
  idAdmuser: number;
  idBicycleHistory: number;
  description: string;
}

export interface IPenaltyEdit {
  idPenalty: number,
  idCtzuser: number;
  idPenaltyType: number;
  idAdmuser: number;
  idBicycleHistory: number;
  description: string;
}
