//find
export interface IStation {
    id: number; 
    name: string; 
    address: string; 
    enabled: boolean; 
    horarioString: string; 
    tsi: string; 
    tsu: string; 
}
export interface StationResponse {
    list: IStation[];
    total: number;
    size: number;
}
//by id
export interface ByIdStation {
    id: number;
    idStation: number | null;
    name: string;
    address: string;
    geolocation: string; // Agregado para capturar la ubicación geográfica
    configuration: IConfiguration; // Agregado para la configuración
    enabled: boolean;
    deleted: boolean; // Campo para saber si está eliminado
    horarioString: string; // Representación del horario en string
    tsi: string; // Timestamp de creación
    tsu: string; // Timestamp de última actualización
}

export interface IConfiguration {
    horariosFuncionamiento: IHorariosFuncionamiento; // Agregado para horarios
}

export interface IHorariosFuncionamiento {
    horariosSemana: IDiaSemana[]; // Arreglo de días de la semana
}

export interface IDiaSemana {
    diaSemana: number; // Número del día de la semana (1 = Lunes, 2 = Martes, etc.)
    horarios: IHorario[]; // Arreglo de horarios para ese día
}

export interface IHorario {
    horaInicio: [number, number]; // Hora de inicio como un arreglo [hora, minuto]
    horaFin: [number, number]; // Hora de fin como un arreglo [hora, minuto]
}

export interface StationByIdResponse {
    list: ByIdStation[]; // Lista de estaciones
    total: number; // Total de estaciones
    size: number; // Tamaño de la página
}
//Edit
export interface EStation {
    id: number | null;
    idStation: number | null;
    name: string;
    address: string;
    geolocation: string; // Agregado para capturar la ubicación geográfica
    configuration: EConfiguration; // Agregado para la configuración

}
export interface EConfiguration {
    horariosFuncionamiento: EHorariosFuncionamiento; // Agregado para horarios
}

export interface EHorariosFuncionamiento {
    horariosSemana: EDiaSemana[]; // Arreglo de días de la semana
}

export interface EDiaSemana {
    diaSemana: number; // Número del día de la semana (1 = Lunes, 2 = Martes, etc.)
    horarios: EHorario[]; // Arreglo de horarios para ese día
}

export interface EHorario {
    horaInicio: [number, number]; // Hora de inicio como un arreglo [hora, minuto]
    horaFin: [number, number]; // Hora de fin como un arreglo [hora, minuto]
}

export interface EditStationProps {
    idStation: number;
    onCancel: () => void;
    onSuccess: () => void;
}

//ADD
export interface AStation {  
    name: string;
    address: string;
    geolocation: string; // Agregado para capturar la ubicación geográfica
    horariosFuncionamiento: AHorariosFuncionamiento;
}

export interface AHorariosFuncionamiento {
    horariosSemana: ADiaSemana[]; // Arreglo de días de la semana
}

export interface ADiaSemana {
    diaSemana: number; // Número del día de la semana (1 = Lunes, 2 = Martes, etc.)
    horarios: AHorario[]; // Arreglo de horarios para ese día
}

export interface AHorario {
    horaInicio: [number, number]; // Hora de inicio como un arreglo [hora, minuto]
    horaFin: [number, number]; // Hora de fin como un arreglo [hora, minuto]
}

