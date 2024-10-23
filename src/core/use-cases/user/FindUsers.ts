import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserResponse } from "../../entities/user/IUser"; 

export class FindUsers {
    private readonly _repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this._repository = repository;
    }

    async findUsers(firstName: string): Promise<UserResponse> {
        return await this._repository.findUsers(firstName);
    }
}
