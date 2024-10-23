import { ApiService } from '../http/ApiService';
import { IModuleRepository } from '../../core/interfaces/IModuleRepository';
import { AModule, EModule } from '../../core/entities/module/IModule';



export class ModuleRepository implements IModuleRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async findModules(page: number, size: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/module/find?page=${page}&size=${size}`);
      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el módulo");
        
      } else {
        // Error no específico
        console.error('Error al buscar el módule', error);
      }
      throw new Error('Error al buscar el módulo');
    }
  }

  async findModulesByCode(code: string): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/module/code/${code}`);
      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el módulo");
        
      } else {
        // Error no específico
        console.error('Error al buscar el módule', error);
      }
      throw new Error('Error al buscar el módulo');
    }
  }

  async findModulesById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/module/${id}`);
      return response.data;
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al buscar el módulo");
        
      } else {
        // Error no específico
        console.error('Error al buscar el módule', error);
      }
      throw new Error('Error al buscar el módulo');
    }
  }
  async editModule(module: EModule): Promise<void> {
    try {
      await this._api.put(`/adm-main/module/edit`, module);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar el modulo");
        
      } else {
        // Error no específico
        console.error('Error editar module', error);
      }
      throw new Error('Error al editar el módulo');
    }
  }
  async registerModule(module: AModule): Promise<void> {
    try {
      await this._api.post('/adm-main/module/create', module);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al crear el modulo");
        
      } else {
        // Error no específico
        console.error('Error editing module', error);
      }
      throw new Error('Error al crear el módulo');
    }
  }
}

