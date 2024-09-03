import { ApiService } from '../http/ApiService';
import { ITokens } from '../../core/entities/ITokens';
import { IUserRegister } from '../../core/entities/IUserRegister';
import { IUserLogin } from '../../core/entities/IUserLogin';
import { IAuthRepository } from '../../core/interfaces/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async signin(credentials: IUserLogin): Promise<ITokens> {
    try {
      const response = await this._api.post<{ token: string}>('/adm-main/session/signin', credentials)
      console.log("Response data: ", response.data);
      return { access_token: response.data.token };
    } catch (err) {
      console.log('Signin Error:', err);
      throw new Error('Error al intentar acceder');
    }
  }
  
  async register(user: IUserRegister): Promise<any> {
    try {
      const response = await this._api.post('/adm-main/admuser/register', user);
      return response.data;
    } catch (err) {
      console.log('Register Error: ',err);
      throw new Error('Error al intentar acceder');
    }
  }

  async findUsers(): Promise<IUserRegister[]> {
    try {
      const response = await this._api.get<IUserRegister[]>('/adm-main/admuser/find');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Find Users Error:' ,error);
      throw new Error('Error al obtener usuarios');
    }
  }
}
