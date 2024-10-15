import { ApiService } from '../../../services/api.service';
import { BikeResponse } from '../../entities/bike/IBike';

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

  

}
export const bikeService = new BikeService();
