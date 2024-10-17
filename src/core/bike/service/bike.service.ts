import { ApiService } from '../../../services/api.service';
import { BikeResponse, IBike, EBike, ABike } from '../../entities/bike/IBike';

export class BikeService extends ApiService {
  private _uri: string = '/adm-bicis/bicycle';

  public async getByPage(
    size: number,
    page: number,
  ): Promise<BikeResponse> {
    try {
      const response = await this.get<BikeResponse>(
        `${this._uri}/find?size=${size}&page=${page}`,
      );

      return response.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
  public async findById(id: number): Promise<IBike> {
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
  } 
  public async addBike(bikeData: ABike): Promise<ABike> {
    try {
      const response = await this.post<ABike>(`${this._uri}/`, bikeData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}
export const bikeService = new BikeService();
