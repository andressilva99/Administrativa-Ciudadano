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
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar la estación");
        
      } else {
        // Error no específico
        console.error('Error al buscar la estación', error);
      }
      throw new Error('Error al buscar la estación');
    }
  }
   public async findById(id: number): Promise<ByIdStation> {
    try {
      const response = await this.get<ByIdStation>(`${this._uri}/${id}`);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar la estación");
        
      } else {
        // Error no específico
        console.error('Error al buscar la estación', error);
      }
      throw new Error('Error al buscar la estación');
    }
  }  
  
  public async editStation(stationData: EStation): Promise<EStation> {
    try {
      const response = await this.put<EStation>(`${this._uri}/`, stationData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar la estación");
        
      } else {
        // Error no específico
        console.error('Error al editar la estación', error);
      }
      throw new Error('Error al editar la estación');
    }
  } 
  public async addStation(stationData: AStation): Promise<AStation> {
    try {
      const response = await this.post<AStation>(`${this._uri}/`, stationData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al registrar la estación");
        
      } else {
        // Error no específico
        console.error('Error al registrar la estación', error);
      }
      throw new Error('Error al registrar la estación');
    }
  }
  public async deleteStation(id: number): Promise<void> {
    try {
      await this.delete<void>(`${this._uri}/${id}`);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al eliminar la estación");
        
      } else {
        // Error no específico
        console.error('Error al eliminar la estación', error);
      }
      throw new Error('Error al eliminar la estación');
    }
  }

}
export const stationService = new StationService();
