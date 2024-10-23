import { ApiService } from "../../../services/api.service";
import  { IStationUserData, IStationUserResponse} from '../../entities/stationUser/IStationuser';

export class StationUserService extends ApiService {
    private _uri: string = '/adm-bicis/station';

    public async getAll(size: number, page: number): Promise<IStationUserResponse> {
        try {
            const response = await this.get<IStationUserResponse>(`${this._uri}/`);
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

    public async findById(id: number): Promise<IStationUserData> {
        try {
          const response = await this.get<IStationUserData>(`${this._uri}/${id}`);
    
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

    public async addStationUser(stationId: number, userId: number): Promise<any> {
        try {
          const response = await this.post<any>(`${this._uri}/${stationId}/admuser/${userId}`, {})
    
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
      
      public async editStationUser(stationId: number, userId: number): Promise<any> {
        try {
          const response = await this.put<any>(`${this._uri}/${stationId}/admuser/${userId}`, {});
    
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
}

export const stationUserService = new StationUserService();