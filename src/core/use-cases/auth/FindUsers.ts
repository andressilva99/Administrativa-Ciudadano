import { IAuthRepository } from '../../interfaces/IAuthRepository';
import { IUserRegister } from '../../entities/auth/IUserRegister';

export class FindUser {
  private _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async execute(): Promise<IUserRegister[]> {
    return await this._repository.findUsers();
  }
}
