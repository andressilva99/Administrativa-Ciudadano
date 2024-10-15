export interface IBike {
    id: number;
    identificationCode: string;
    idCurrentSlot: number | null;
    idCurrentStation: number | null;
    idGpsDeviceCurrent: number | null;
    comments: string | null;
    configuration: {
        empty: boolean;
    };
    enabled: boolean;
    tsi: string; 
    tsu: string; 
}
export interface BikeResponse {
    list: IBike[];
    total: number;
    size: number;
  }