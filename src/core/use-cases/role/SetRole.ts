import { IRoleRepository } from "../../interfaces/IRoleRepository";

export class SetRole {
    private readonly _repository: IRoleRepository;

    constructor(repository: IRoleRepository) {
        this._repository = repository;
    }

    async setRole(userId: number, roleId: number): Promise<void> {
        await this._repository.setRole(userId, roleId);
    }
}