import {  UserResponse } from "../entities/user/IUser";

export interface IUserRepository {
    findUsers(firtName : string): Promise<UserResponse>;
}