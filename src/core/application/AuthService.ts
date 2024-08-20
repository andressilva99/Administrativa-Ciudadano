import { AuthRepository } from '../infrastructure/repository/AuthRepository';

export class AuthService {
  private _repository: AuthRepository;

  constructor() {
    this._repository = new AuthRepository();
  }

  async signin(email: string, password: string): Promise<any> {
    return await this._repository.signin(email, password);
  }

  async register(
    firstName: string,
    lastName: string,
    dni: string,
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<any> {
    return await this._repository.register(firstName, lastName, dni, email, phoneNumber, password);
  }

  async findUsers(): Promise<any> {
    return await this._repository.findUsers();
  }
}
