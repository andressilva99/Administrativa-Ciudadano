import { ITokens } from '../entities/ITokens';
import { IUserLogin } from '../entities/IUserLogin';
import { IAuthRepository } from '../interfaces/IAuthRepository';

export class LoginUser {
  private _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async signin(credentials: IUserLogin): Promise<void> {
    try {
      const response: ITokens = await this._repository.signin(credentials);
      window.localStorage.setItem('access_token', response.access_token);
      console.log("Token guardado:", response.access_token);
    } catch (err) {
      console.error('Error during sign in', err);
    }
  }
}