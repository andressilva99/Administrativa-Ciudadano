import { ApiService } from '../../../services/api.service';
import { StationResponse } from '../../entities/station/IStation';

export class StationService extends ApiService {
  private _uri: string = '/adm-bicis/station';

  public async getByPage(
    size: number,
    page: number,
  ): Promise<StationResponse> {
    try {
      const response = await this.get<StationResponse>(
        `${this._uri}/find?size=${size}&page=${page}`,
      );

      return response.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
  /* public async findById(id: number): Promise<IBike> {
    try {
      const response = await this.get<IBike>(`${this._uri}/${id}`);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public async findByCode(identificationCode: string): Promise<IBike> {
    try {
      const response = await this.get<IBike>(`${this._uri}/code/${identificationCode}`);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public async editBike(bikeData: EBike): Promise<EBike> {
    try {
      const response = await this.put<EBike>(`${this._uri}/`, bikeData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  } */

}
export const stationService = new StationService();
