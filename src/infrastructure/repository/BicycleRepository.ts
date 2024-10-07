import { IBicycleRepo } from "../../core/interfaces/IBicycleRepository";
import { ICitizen, IBicycle } from "../../core/entities/bicycle/IBicycle";
import { ApiService } from "../http/ApiService";

export class BycicleRepo implements IBicycleRepo {
    private readonly _api: ApiService;

    constructor (apiService: ApiService) {
        this._api = apiService;
    }

    async scanDNI(barcode: string): Promise<ICitizen> {
        try {
            const headers = {
                'barcode': barcode
            };
            const response = await this._api.get<ICitizen>('/adm-bicis/bicyclerequest/ctzverification', { headers });
            return response.data;
        } catch (err) {
            console.error('Error al escanear el DNI: ', err );
            throw new Error('Error al escanear el DNI');
        }
    }

    async getAvaliableBycicle(stationId: number): Promise<IBicycle[]> {
        try {
            const response = await this._api.get<IBicycle[]>(`/adm-bicis/bicyclerequest/availablebycicles?stationId=${stationId}`);
            return response.data;
        } catch (err) {
            console.error('Error al consultar bicicletas: ', err );
            throw new Error('Error al consultar bicicletas disponibles');
        }
    }

    async confirmBicycleRequest(idCtzUser: number, idBicycle: number, deliverComments: string = ''): Promise<void> {
        try {
          await this._api.post('/adm-bicis/bicyclerequest/confirmrequest', {
            idCtzUser,
            idBicycle,
            deliverComments,
          });
        } catch (err) {
          console.error('Error al confirmar la entrega de bicicleta:', err);
          throw new Error('Error al confirmar la solicitud de bicicleta');
        }
      }

}