import { ApiService } from '../http/ApiService';
import { IUserRepository } from '../../core/interfaces/IUserRepository'; 
import { UserResponse } from '../../core/entities/user/IUser';

export class UserRepository implements IUserRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async findUsers(firstName: string): Promise<UserResponse> {
    try {
      const response = await this._api.get<UserResponse>(`/adm-main/admuser/find?firstName=${firstName}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener usuarios');
    }
  }
}