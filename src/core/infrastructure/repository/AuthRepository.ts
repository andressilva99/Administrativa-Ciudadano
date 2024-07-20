import { ApiService } from '../http/ApiService';

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
}
