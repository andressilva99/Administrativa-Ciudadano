import { IUserRepository } from "../../interfaces/IUserRepository";

export class DeleteUser {
    private readonly _repository: IUserRepository;
    
    constructor(repository: IUserRepository){
        this._repository = repository;
    }

    async deleteUser(id: number): Promise<void> {
        await this._repository.deleteUser(id);
    }
}