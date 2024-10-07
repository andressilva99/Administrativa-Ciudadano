import { IBicycleRepo } from "../../interfaces/IBicycleRepository";
import { ICitizen, IBicycle } from "../../entities/bicycle/IBicycle";

export class BicycleUseCase {
    private _repository: IBicycleRepo;

    constructor(repository: IBicycleRepo) {
        this._repository = repository;
    }

    async scanDNI(barcode: string): Promise<ICitizen> {
        try {
            const citizen = await this._repository.scanDNI(barcode);
            localStorage.setItem('citizenId', citizen.id.toString());
            return citizen;
        } catch (err) {
            console.log('Error al escanear el DNI', err);
            throw new Error('Erro al procesar el escaneo del DNI');
        }
    }

    async getAvailableBicycles(stationId: number): Promise<IBicycle[]> {
        try {
            const bicycles = await this._repository.getAvaliableBycicle(stationId);
            return bicycles.filter(bike => bike.enabled && bike.idGpsDeviceCurrent);
        } catch (err) {
            console.log('Error al obtener bicicletas disponibles', err);
            throw new Error('Erro al consultar bicicletas disponibles');
        }
    }

    async confirmBicycleRequest(idCtzUser: number, idBicycle: number, deliverComments: string = ''): Promise<void> {
        try {
            await this._repository.confirmBicycleRequest(idCtzUser, idBicycle, deliverComments);
            console.log('Entrega realiza con exito');
        } catch (err) {
            console.log('Error al confirmar la entrega', err);
            throw new Error('Erro al confirmar la entrega de la bicicleta');
        }
    }
}