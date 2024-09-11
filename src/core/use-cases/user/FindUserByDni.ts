import { IUserRepository } from "../../interfaces/IUserRepository";
import { IUser } from "../../entities/user/IUser";

export class FindUsersByDni {
    private readonly _repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this._repository = repository;
    }

    async findUsersByDni(dni: string): Promise<IUser> {
        return await this._repository.findUsersByDni(dni);
    }
}