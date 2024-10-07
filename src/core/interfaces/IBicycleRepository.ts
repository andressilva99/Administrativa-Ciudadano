import { IBicycle, ICitizen } from "../entities/bicycle/IBicycle";

export interface IBicycleRepo {
    scanDNI(barcode: string): Promise<ICitizen>;
    getAvaliableBycicle(stationId: number): Promise<IBicycle[]>;
    confirmBicycleRequest(idCtzUser: number, idBicycle: number, deliverComments?: string): Promise<void>;
}