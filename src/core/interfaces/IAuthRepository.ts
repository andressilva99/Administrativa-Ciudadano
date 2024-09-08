import type { ITokens } from '../entities/auth/IAuth';
import { IUserLogin } from '../entities/auth/IAuth';
import type { IUserRegister } from '../entities/auth/IAuth';

export interface IAuthRepository {
  signin(credentials: IUserLogin): Promise<ITokens>;
  register(user: IUserRegister): Promise<any>;
  findUsers(): Promise<IUserRegister[]>;
}
