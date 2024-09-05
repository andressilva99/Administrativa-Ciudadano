import { ApiService } from '../http/ApiService';
import { IModuleRepository } from '../../core/interfaces/IModuleRepository';

export class ModuleRepository implements IModuleRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async findModules(page: number, size: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/module/find?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulos');
    }
  }

  async findModulesByCode(code: string): Promise<any> {
    try {
      const response = await this._api.get(`adm-main/module/code/${code}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener buscar modulo');
    }
  }

  async findModulesById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`adm-main/module/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulo por id');
    }
  }

  async editModule(
    moduleId: number,
    enabledNp: boolean,
    enabledLp: boolean,
    minNpLevel: number,
    minLpLevel: number,
  ): Promise<any> {
    try {
      const response = await this._api.put('/adm-main/module/edit', {
        moduleId,
        enabledNp,
        enabledLp,
        minNpLevel,
        minLpLevel,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al editar el módulo');
    }
  }
}
