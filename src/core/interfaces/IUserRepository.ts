import {  UserResponse, UserByIdResponse } from "../entities/user/IUser";

export interface IUserRepository {
    findUsers(firtName : string): Promise<UserResponse>;
    findUsersById(id: number): Promise<UserByIdResponse>;

}