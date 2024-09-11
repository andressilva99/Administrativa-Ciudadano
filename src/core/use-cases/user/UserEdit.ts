import { IUserRepository } from "../../interfaces/IUserRepository";
import { EUser } from "../../entities/user/IUser";

export class UserEdit {
    private readonly _repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this._repository = repository;
    }

    async editUser(
        id: number,                  
        updatedUser: EUser            
    ): Promise<void> {
        await this._repository.editUser(id, updatedUser);
    }
}