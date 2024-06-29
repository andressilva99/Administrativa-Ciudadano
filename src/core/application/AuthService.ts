import { AuthRepository } from '../infrastructure/repository/AuthRepository';

export class AuthService {
  private _repository: AuthRepository;

  constructor() {
    this._repository = new AuthRepository();
  }

  async signin(email: string, password: string): Promise<any> {
    return await this._repository.signin(email, password);
  }
}
