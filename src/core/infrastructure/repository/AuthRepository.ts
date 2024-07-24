import { ApiService } from '../http/ApiService';
import { Permission } from '../../Permission';

export class AuthRepository {
  private _api: ApiService;

  constructor() {
    this._api = new ApiService();
  }

  async signin(username: string, password: string): Promise<any> {
    try {
      const response = await this._api.post('/adm-main/session/signin', { username, password });
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Error al intentar acceder');
    }
  }

  //----------------------------------------MODULOS------------------------------------
  async findModules(page: number, size: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/module/find?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulos');
    }
  }

  //BUSCAR MODULO
  async findModulesByCode(code: string): Promise<any> {
    try {
      const response = await this._api.get(`adm-main/module/code/${code}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener buscar modulo');
    }
  }

  //BUSCAR MODULO POR ID
  async findModulesById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`adm-main/module/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulo por id');
    }
  }

  //--------------------------------------------------ROLES------------------------------------
  async findRoles(id: number, enabled: boolean, deleted: boolean, page: number, size: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/admrole/find?moduleId=${id}&enabled=${enabled}&deleted=${deleted}&page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener roles');
    }
  }
  //Agregar rol
  
  async registerRol(
    
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<any> {
    try {
      const response = await this._api.post('adm-main/admrole/registerRol', {
        idModule,
        name,
        description,
        permissionsList,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al cargar el usuario');
    }
  }
}
