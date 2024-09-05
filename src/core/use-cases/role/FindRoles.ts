import { IRoleRepository } from "../../interfaces/IRoleRepository";
import { IRole } from "../../entities/role/IRole";

export class FindRoles {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    async findRoles(moduleCode: string, page: number, size: number): Promise<IRole[]> {
        return await this._repository.findRoles(moduleCode, page, size);
    }
}