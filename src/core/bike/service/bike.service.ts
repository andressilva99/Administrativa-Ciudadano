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
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el bici");
        
      } else {
        // Error no específico
        console.error('Error al buscar el bici', error);
      }
      throw new Error('Error al buscar el bici');
    }
  }
  public async findById(id: number): Promise<IBike> {
    try {
      const response = await this.get<IBike>(`${this._uri}/${id}`);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el bici");
        
      } else {
        // Error no específico
        console.error('Error al buscar el bici', error);
      }
      throw new Error('Error al buscar el bici');
    }
  }
  public async findByCode(identificationCode: string): Promise<IBike> {
    try {
      const response = await this.get<IBike>(`${this._uri}/code/${identificationCode}`);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el bici");
        
      } else {
        // Error no específico
        console.error('Error al buscar el bici', error);
      }
      throw new Error('Error al buscar el bici');
    }
  }
  public async editBike(bikeData: EBike): Promise<EBike> {
    try {
      const response = await this.put<EBike>(`${this._uri}/`, bikeData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar el bici");
        
      } else {
        // Error no específico
        console.error('Error al editar el bici', error);
      }
      throw new Error('Error al editar el bici');
    }
  } 
  public async addBike(bikeData: ABike): Promise<ABike> {
    try {
      const response = await this.post<ABike>(`${this._uri}/`, bikeData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Errorr al registrar el bici");
        
      } else {
        // Error no específico
        console.error('Errorrr al registrar el bici', error);
      }
      throw new Error('Errorrrrr al registrar el bici');
    }
  }
  public async deleteBike(id: number): Promise<void> {
    try {
      await this.delete<void>(`${this._uri}/${id}`);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al eliminar bici");
        
      } else {
        // Error no específico
        console.error('Error al eliminar bici', error);
      }
      throw new Error('Error al eliminar bici');
    }
  }

}
export const bikeService = new BikeService();
