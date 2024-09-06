import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserByIdResponse } from "../../entities/user/IUser"; 

export class FindUsersById {
    private readonly _repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this._repository = repository;
    }

    async findUsersById(id: number): Promise<UserByIdResponse> {
        return await this._repository.findUsersById(id);
    }
}