import { IRoleRepository } from "../../interfaces/IRoleRepository";
import { ERole } from "../../entities/role/IRole";

export class EditRole {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    // Refactorizamos el método para recibir un objeto de tipo EModule
    async editRole(role: ERole): Promise<void> {
        // Llama al repositorio con el objeto completo
        await this._repository.editRole(role);
    }
}
