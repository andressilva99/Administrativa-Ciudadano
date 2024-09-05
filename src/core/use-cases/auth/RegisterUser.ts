import { IAuthRepository } from '../../interfaces/IAuthRepository';
import { IUserRegister } from '../../entities/auth/IUserRegister';

export class RegisterUser {
  private _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async register(user: IUserRegister): Promise<any> {
    return await this._repository.register(user);
  }
}
