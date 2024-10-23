//FIND
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
//BY ID
export interface ByIdBike {
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
export interface BikeByIdProps {
    id: number,
    onCancel: () => void;
}

//BY CODE
export interface ByCodeBike {
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
export interface BikeByCodeProps {
    identificationCode: string,
    onCancel: () => void;
}

//EDIT 
export interface EditBikeProps {
    idBicycle: number;
    onCancel: () => void;
    onSuccess: () => void;
}
  
export interface EBike {
    id: number | null;
    idBicycle: number | null;
    identificationCode: string;
    idCurrentStation: number | null;
    enabled: boolean;
}

//ADD
export interface ABike {
    identificationCode: string;
    idCurrentStation: number;
    idGpsDeviceCurrent: number;
}