import { ApiService } from '../../../services/api.service';
import { IPenaltyTypeAdd, IPenaltyTypeData, IPenaltyTypeEdit, PenaltyTypeResponse } from '../../entities/penaltyType/IPenaltyType';

export class PenaltyTypeService extends ApiService {
  private _uri: string = '/adm-bicis/penaltytype';

  public async getAll(size: number, page: number): Promise<PenaltyTypeResponse> {
    try {
      const response = await this.get<PenaltyTypeResponse>(`${this._uri}/`);
      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el tipo de penalización");
        
      } else {
        // Error no específico
        console.error('Error al buscar el tipo de penalización', error);
      }
      throw new Error('Error al buscar el tipo de penalización');
    }
  }

  public async findById(id: number): Promise<IPenaltyTypeData> {
    try {
      const response = await this.get<IPenaltyTypeData>(`${this._uri}/${id}`);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el tipo de penalización");
        
      } else {
        // Error no específico
        console.error('Error al buscar el tipo de penalización', error);
      }
      throw new Error('Error al buscar el tipo de penalización');
    }
  }

  public async addPenaltyType(penaltyTypeData: IPenaltyTypeAdd): Promise<IPenaltyTypeAdd> {
    try {
      const response = await this.post<IPenaltyTypeAdd>(`${this._uri}/`, penaltyTypeData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al registrar el tipo de penalización");
        
      } else {
        // Error no específico
        console.error('Error al registrar el tipo de penalización', error);
      }
      throw new Error('Error al registrar el tipo de penalización');
    }
  }

  public async editPenaltyType(penaltyTypeData: IPenaltyTypeEdit): Promise<IPenaltyTypeEdit> {
    try {
      const response = await this.put<IPenaltyTypeEdit>(`${this._uri}/`, penaltyTypeData);

      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar el tipo de penalización");
        
      } else {
        // Error no específico
        console.error('Error al editar el tipo de penalización', error);
      }
      throw new Error('Error al editar el tipo de penalización');
    }
  }

  public async deletePenaltyType(id: number): Promise<void> {
    try {
      await this.delete<void>(`${this._uri}/${id}`);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al eliminar el tipo de penalización");
        
      } else {
        // Error no específico
        console.error('Error al eliminar el tipo de penalización', error);
      }
      throw new Error('Error al eliminar el tipo de penalización');
    }
  }
}

export const penaltyTypeService = new PenaltyTypeService();
