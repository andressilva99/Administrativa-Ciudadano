export interface PenaltyTypeResponse {
    list: IPenaltyTypeData[];
    total: number;
    size: number;
}

export interface IPenaltyTypeData {
  id: number;
  name: string;
  code: string;
  fixed: boolean;
  description: string;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
}

export interface IPenaltyTypeAdd {
  name: string;
  code: string;
  description: string;
}


export interface IPenaltyTypeEdit {
  idPenaltyType: number;
  name: string;
  code: string;
  description: string;
  enabled: boolean;
}
