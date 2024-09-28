import { ApiService } from '../http/ApiService';
import { IPasswordChange, ITokens } from '../../core/entities/auth/IAuth';
import { IUserLogin } from '../../core/entities/auth/IAuth';
import { IAuthRepository } from '../../core/interfaces/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async signin(credentials: IUserLogin): Promise<ITokens> {
    try {
      const response = await this._api.post<{ token: string }>(
        '/adm-main/session/signin',
        credentials,
      );
      console.log('Response data: ', response.data);
      return { access_token: response.data.token };
    } catch (err) {
      console.log('Signin Error:', err);
      throw new Error('Error al intentar acceder');
    }
  }

  async changePw(passwordData: IPasswordChange): Promise<void> {
    try {
      await this._api.put('/adm-main/session/changepw', passwordData);
      console.log('Contraseña cambiada exitosamente');
    } catch (err) {
      console.error('Error al cambiar la contraseña', err);
      throw new Error('Error al intentar cambiar la contraseña');
    }
  }
}
