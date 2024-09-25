import {  UserResponse, IUserAdd, EUser, IUser } from "../entities/user/IUser";

export interface IUserRepository {
    findUsers(firtName : string): Promise<UserResponse>;
    findUsersById(id: number): Promise<IUser>;
    findUsersByDni(dni: string): Promise<IUser>;
    registerUser(user: IUserAdd): Promise<any>;
    editUser(updatedUser: EUser): Promise<void>;
    deleteUser(id: number): Promise<void>;

}