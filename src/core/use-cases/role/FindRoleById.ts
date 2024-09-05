import { IRoleRepository } from "../../interfaces/IRoleRepository";
import { IRole } from "../../entities/role/IRole";

export class FindRoleById {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    async execute(id: number): Promise<IRole> {
        return await this._repository.findRoleById(id);
    }

}