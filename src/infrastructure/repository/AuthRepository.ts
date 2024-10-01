import { ApiService } from '../http/ApiService';
import { IPasswordChange, IPasswordRecovery, ITokens } from '../../core/entities/auth/IAuth';
import { IUserLogin } from '../../core/entities/auth/IAuth';
import { IAuthRepository } from '../../core/interfaces/IAuthRepository';
import { setUser } from '../../store/reducers/slices/userSlice';
import { dispatch } from '../../store';

export class AuthRepository implements IAuthRepository {
  private readonly _api: ApiService;

  constructor(apiService: ApiService) {
    this._api = apiService;
  }

  async signin(credentials: IUserLogin): Promise<ITokens> {
    try {
      const response = await this._api.post<{ token: string; admUser: {firstName: string, lastName: string} }>(
        '/adm-main/session/signin',
        credentials,
      );
      
      console.log('Response data: ', response.data);

      dispatch(setUser({
        firstName: response.data.admUser.firstName,
        lastName: response.data.admUser.lastName,
      }));

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

  async recoveredPw(passwordRecovered: IPasswordRecovery): Promise<void> {
    try {
      const recoverdata = passwordRecovered.email || passwordRecovered.dni;

      if (!recoverdata) {
        throw new Error('Debe proporcionar un email o DNI');
      }

      const headers = {
        recoverdata,
      };

      await this._api.post('/adm-main/session/recoverpw', {}, { headers });
      
      console.log('Contraseña de recuperación enviado exitosamente');
    } catch (err) {
      console.error('Error al enviar correo de recuperación', err);
      throw new Error('Error al intentar recuperar la contraseña');
    }
  }
}
