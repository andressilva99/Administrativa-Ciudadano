import { ApiService } from '../http/ApiService';
import { IUserRepository } from '../../core/interfaces/IUserRepository';
import { EUser, IUserAdd, UserResponse } from '../../core/entities/user/IUser';

export class UserRepository implements IUserRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async findUsers(firstName: string): Promise<UserResponse> {
    try {
      const response = await this._api.get<UserResponse>(
        `/adm-main/admuser/find?firstName=${firstName}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener usuarios');
    }
  }
  //no tengo nada de buscar por id en endpoint
  async findUsersById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/admuser/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulo por id');
    }
  }
  async findUsersByDni(dni: string): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/admuser/find?dni=${dni}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener modulo por dni');
    }
  }

  async registerUser(user: IUserAdd): Promise<void> {
    try {
      await this._api.post('/adm-main/admuser/register', user);
    } catch (error : any) {
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

  async editUser(id: number, updatedUser: EUser): Promise<void> {
    try {
      await this._api.put(`/adm-main/admuser/edit${id}`, updatedUser);
    } catch (error) {
      console.log(error);
      throw new Error('Error al editar el usuario');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this._api.delete(`/adm-main/admuser/delete${id}`);
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar usuario');
    }
  }
}
