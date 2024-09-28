import { IRoleRepository } from "../../interfaces/IRoleRepository";

export class UnsetRole {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    async unsetRole(userId: number, roleId: number): Promise<void> {
        await this._repository.unsetRole(userId, roleId);
    }
}