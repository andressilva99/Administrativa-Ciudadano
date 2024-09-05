import { IModuleRepository } from "../../interfaces/IModuleRepository";
import { IModule } from "../../entities/module/IModule";

export class FindModulesByCode {
    private readonly _repository: IModuleRepository;

    constructor(repository: IModuleRepository) {
        this._repository = repository;
    }

    async findModulesBycode(code: string): Promise<IModule> {
        return await this._repository.findModulesByCode(code);
    }
}