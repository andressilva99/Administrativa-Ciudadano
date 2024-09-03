import type { ITokens } from "../entities/ITokens";
import { IUserLogin } from "../entities/IUserLogin";
import type { IUserRegister } from "../entities/IUserRegister";

export interface IAuthRepository {
    signin(credentials: IUserLogin): Promise<ITokens>;
    register(user: IUserRegister): Promise<any>;
    findUsers(): Promise<IUserRegister[]>;
}