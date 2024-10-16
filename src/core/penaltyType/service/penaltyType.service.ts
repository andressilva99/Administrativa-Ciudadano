import { ApiService } from '../../../services/api.service';
import { IPenaltyTypeAdd, IPenaltyTypeData, IPenaltyTypeEdit, PenaltyTypeResponse } from '../../entities/penaltyType/IPenaltyType';

export class PenaltyTypeService extends ApiService {
  private _uri: string = '/adm-bicis/penaltytype';

  public async getAll(size: number, page: number): Promise<PenaltyTypeResponse> {
    try {
      const response = await this.get<PenaltyTypeResponse>(`${this._uri}/`);
      return response.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  public async findById(id: number): Promise<IPenaltyTypeData> {
    try {
      const response = await this.get<IPenaltyTypeData>(`${this._uri}/${id}`);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async addPenaltyType(penaltyTypeData: IPenaltyTypeAdd): Promise<IPenaltyTypeAdd> {
    try {
      const response = await this.post<IPenaltyTypeAdd>(`${this._uri}/`, penaltyTypeData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async editPenaltyType(penaltyTypeData: IPenaltyTypeEdit): Promise<IPenaltyTypeEdit> {
    try {
      const response = await this.put<IPenaltyTypeEdit>(`${this._uri}/`, penaltyTypeData);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async deletePenaltyType(id: number): Promise<void> {
    try {
      await this.delete<void>(`${this._uri}/${id}`);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const penaltyTypeService = new PenaltyTypeService();
