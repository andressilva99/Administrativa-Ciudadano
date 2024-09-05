import { ApiService } from '../http/ApiService';
import { IRoleRepository } from '../../core/interfaces/IRoleRepository';
import { Permission } from '../../core/entities/role/Permission';
import { IRole } from '../../core/entities/role/IRole';

export class RoleRepository implements IRoleRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async findRoles(
    idModule: string,
    page: number,
    size: number,
  ): Promise<{ list: IRole[]; total: number }> {
    try {
      const response = await this._api.get(
        `/adm-main/role/find?module_code=${idModule}&page=${page}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener roles');
    }
  }

  async findRoleById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/role/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener rol por id');
    }
  }

  async registerRole(
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<any> {
    try {
      const response = await this._api.post('/adm-main/admrole/registerRol', {
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
