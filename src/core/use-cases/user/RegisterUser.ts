import { IUserRepository } from "../../interfaces/IUserRepository";
import { IUserAdd } from "../../entities/user/IUser";

export class RegisterUser {
    private readonly _repository: IUserRepository;

    constructor (repository: IUserRepository) {
        this._repository = repository;
    }

    async registerUser(user: IUserAdd): Promise<void> {
        await this._repository.registerUser(user);
    }
}