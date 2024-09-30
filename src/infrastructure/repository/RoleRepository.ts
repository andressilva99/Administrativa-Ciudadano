import { ApiService } from '../http/ApiService';
import { IRoleRepository } from '../../core/interfaces/IRoleRepository';
import { IRole, IRoleAdd, ERole } from '../../core/entities/role/IRole';
import { CustomError } from '../../core/errors/CustomError';

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

  async findRoleById(id: number): Promise<IRole> {
    try {
      const response = await this._api.get(`/adm-main/role/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener rol por id');
    }
  }

  async registerRole(role: IRoleAdd): Promise<void> {
    try {
      await this._api.post('/adm-main/role/create', role);
    } catch (error) {
      console.log(error);
      throw new Error('Error al registrar el rol');
    }
  }

  async editRole(role : ERole): Promise<void> {
    try {
      await this._api.put(`/adm-main/role/edit`, role);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar el modulo");
        
      } else {
        // Error no específico
        console.error('Error editing module', error);
      }
      throw new Error('Error al editar el módulo');
    }
  }

  //Edit Roles de Usuario
  async setRole(userId: number, roleId: number): Promise<void> {
    const payload = {
      idAdmUser: userId,
      idAdmRole: roleId
    };
    try {
      await this._api.post('/adm-main/admuser/role/set', payload);
    } catch (error : any) {
      const message = error.response?.data?.message || "Error al setear el rol de usario";
      throw new CustomError(message, error.response?.status);
    }
  }
  async unsetRole(userId: number, roleId: number): Promise<void> {
    const payload = {
      idAdmUser: userId,
      idAdmRole: roleId
    };
    try {
      await this._api.post('/adm-main/admuser/role/unset', payload);
    } catch (error : any) {
      const message = error.response?.data?.message || "Error al quitar el rol de usario";
      throw new CustomError(message, error.response?.status);
    }
  }
}
