import type { IPasswordChange, ITokens } from '../entities/auth/IAuth';
import { IUserLogin} from '../entities/auth/IAuth';

export interface IAuthRepository {
  signin(credentials: IUserLogin): Promise<ITokens>;
  changePw(passwordData: IPasswordChange): Promise<void>;
}
