import { ApiService } from '../http/ApiService';
import { IUserRepository } from '../../core/interfaces/IUserRepository';
import { EUser, IUserAdd, UserResponse } from '../../core/entities/user/IUser';
import { CustomError } from '../../core/errors/CustomError';

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
    } catch (error: any) {
      console.log(error);
      throw new CustomError('Error al obtener los usuarios', error.response?.status);
    }
  }

  async findUsersById(id: number): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/admuser/${id}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Este ID no corresponde a ningún usuario o no es válido'; 
      throw new CustomError(message, error.response?.status);
    }
  }
  
  async findUsersByDni(dni: string): Promise<any> {
    try {
      const response = await this._api.get(`/adm-main/admuser/find?dni=${dni}`);
      return response.data;
    } catch (error : any) {
      const message = error.response?.data?.message || "Error al encontrar el usario";
      throw new CustomError(message, error.response?.status);
    }
  }

  async registerUser(user: IUserAdd): Promise<void> {
    try {
      await this._api.post('/adm-main/admuser/register', user);
    } catch (error : any) {
      const message = error.response?.data?.message || "Error al registrar el usario";
      throw new CustomError(message, error.response?.status);
    }
  }

  async editUser(updatedUser: EUser): Promise<void> {
    try {
      await this._api.put(`/adm-main/admuser/edit`, updatedUser);
    } catch (error: any) {
      if (error) {
        // Error específico de Axios
        console.log(error.response.data);
        throw( error.response.data.message ? error.response.data.message : "Error al editar el usuario");
        
      } else {
        // Error no específico
        console.error('Error editar usuario', error);
      }
      throw new Error('Error al editar el usuario');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this._api.delete(`/adm-main/admuser/delete${id}`);
    } catch (error : any) {
      const message = error.response?.data?.message || "Error al borrar el usario";
      throw new CustomError(message, error.response?.status);
    }
  }
}
