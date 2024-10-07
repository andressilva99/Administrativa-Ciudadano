export interface IBicycle {
    id: number;
    identificationCode: string;
    idCurrentSlot: number | null;
    idCurrentStation: number;
    idGpsDeviceCurrent: number;
    enabled: boolean;
    tsi: string;
    tsu: string;
    comments?: string;
}

export interface ICitizen {
    id: number;
    tipoDocumento: string;
    numeroDocumento: string;
    nombrePersona: string;
    apellido: string;
    email: string;
    numeroTelefono: string;
    estado: number;
    npLevel: number;
    lpLevel: number | null;
}