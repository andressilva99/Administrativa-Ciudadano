import { ApiService } from '../http/ApiService';

interface LoginResponse {
  token: string;
  admUser: object;
  moduleList: any[];
}

export class AuthRepository {
  private _api: ApiService;

  constructor() {
    this._api = new ApiService();
  }

  async signin(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this._api.post<LoginResponse>('/adm-main/session/signin', {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Error al intentar acceder');
    }
  }

  async register(
    firstName: string,
    lastName: string,
    dni: string,
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<any> {
    try {
      const response = await this._api.post('/adm-main/admuser/register', {
        firstName,
        lastName,
        dni,
        email,
        phoneNumber,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al cargar el usuario');
    }
  }

  async findUsers(): Promise<any> {
    try {
      const response = await this._api.get('/adm-main/admuser/find');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener usuarios');
    }
  }
}
