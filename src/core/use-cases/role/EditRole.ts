import { IRoleRepository } from "../../interfaces/IRoleRepository";
import { ERole } from "../../entities/role/IRole";

export class EditRole {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    async editRole(
        id: number,                  
        updatedRole: ERole            
    ): Promise<void> {
        await this._repository.editRole(id, updatedRole);
    }
}
