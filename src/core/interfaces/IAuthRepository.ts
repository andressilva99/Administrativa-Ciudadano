import type { ITokens } from '../entities/auth/ITokens';
import { IUserLogin } from '../entities/auth/IUserLogin';
import type { IUserRegister } from '../entities/auth/IUserRegister';

export interface IAuthRepository {
  signin(credentials: IUserLogin): Promise<ITokens>;
  register(user: IUserRegister): Promise<any>;
  findUsers(): Promise<IUserRegister[]>;
}
