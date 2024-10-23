import { ApiService } from '../../../services/api.service';
import {
  IPenaltyAdd,
  IPenaltyData,
  IPenaltyEdit,
  PenaltyResponse,
} from '../../entities/penalty/IPentalty';

export class PenaltyService extends ApiService {
  private _uri: string = '/adm-bicis/penalty';

  public async getByPage(
    prop: string,
    search: string,
    size: number,
    page: number,
    issuedDateFrom: string,
    issuedDateTo: string,
  ): Promise<PenaltyResponse> {
    try {
      const response = await this.get<PenaltyResponse>(
        `${this._uri}/find?${prop}=${search}&size=${size}&page=${page}&issuedDateFrom=${issuedDateFrom}&issuedDateTo=${issuedDateTo}`,
      );

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar la penalización");
        
      } else {
        // Error no específico
        console.error('Error al buscar la penalización', error);
      }
      throw new Error('Error al buscar la penalización');
    }
  }

  public async findById(id: number): Promise<IPenaltyData> {
    try {
      const response = await this.get<IPenaltyData>(`${this._uri}/${id}`);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar la penalización");
        
      } else {
        // Error no específico
        console.error('Error al buscar la penalización', error);
      }
      throw new Error('Error al buscar la penalización');
    }
  }

  public async addPenalty(penaltyData: IPenaltyAdd): Promise<IPenaltyAdd> {
    try {
      const response = await this.post<IPenaltyAdd>(`${this._uri}/`, penaltyData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al registrar la penalización");
        
      } else {
        // Error no específico
        console.error('Error al registrar la penalización', error);
      }
      throw new Error('Error al registrar la penalización');
    }
  }
  
  public async editPenalty(penaltyData: IPenaltyEdit): Promise<IPenaltyEdit> {
    try {
      const response = await this.put<IPenaltyEdit>(`${this._uri}/`, penaltyData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar la penalización");
        
      } else {
        // Error no específico
        console.error('Error al editar la penalización', error);
      }
      throw new Error('Error al editar la penalización');
    }
  }
}

export const penaltyService = new PenaltyService();
