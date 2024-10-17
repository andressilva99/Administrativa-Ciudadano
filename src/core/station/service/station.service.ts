import { ApiService } from '../../../services/api.service';
import { StationResponse, ByIdStation, EStation, AStation } from '../../entities/station/IStation';

export class StationService extends ApiService {
  private _uri: string = '/adm-bicis/station';

  public async getByPage(    
  ): Promise<StationResponse> {
    try {
      const response = await this.get<StationResponse>(
        `${this._uri}/`,
      );

      return response.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
   public async findById(id: number): Promise<ByIdStation> {
    try {
      const response = await this.get<ByIdStation>(`${this._uri}/${id}`);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }  
  
  public async editStation(stationData: EStation): Promise<EStation> {
    try {
      const response = await this.put<EStation>(`${this._uri}/`, stationData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  } 
  public async addStation(stationData: AStation): Promise<AStation> {
    try {
      const response = await this.post<AStation>(`${this._uri}/`, stationData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public async deleteStation(id: number): Promise<void> {
    try {
      await this.delete<void>(`${this._uri}/${id}`);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}
export const stationService = new StationService();
