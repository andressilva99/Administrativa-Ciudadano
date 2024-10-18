import { ApiService } from "../../../services/api.service";
import  { IStationUserResponse} from '../../entities/stationUser/IStationuser';

export class StationUserService extends ApiService {
    private _uri: string = '/adm-bicis/station';

    public async getAll(size: number, page: number): Promise<IStationUserResponse> {
        try {
            const response = await this.get<IStationUserResponse>(`${this._uri}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export const stationUserService = new StationUserService();