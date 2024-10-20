import { ApiService } from "../../../services/api.service";
import  { IStationUserData, IStationUserResponse} from '../../entities/stationUser/IStationuser';

export class StationUserService extends ApiService {
    private _uri: string = '/adm-bicis/station';

    public async getAll(size: number, page: number): Promise<IStationUserResponse> {
        try {
            const response = await this.get<IStationUserResponse>(`${this._uri}/`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async findById(id: number): Promise<IStationUserData> {
        try {
          const response = await this.get<IStationUserData>(`${this._uri}/${id}`);
    
          return response.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

    public async addStationUser(stationId: number, userId: number): Promise<any> {
        try {
          const response = await this.post<any>(`${this._uri}/${stationId}/admuser/${userId}`, {})
    
          return response.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
      
      public async editStationUser(stationId: number, userId: number): Promise<any> {
        try {
          const response = await this.put<any>(`${this._uri}/${stationId}/admuser/${userId}`, {});
    
          return response.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
}

export const stationUserService = new StationUserService();