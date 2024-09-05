import { IModuleRepository } from "../../interfaces/IModuleRepository";
import { IModule } from "../../entities/module/IModule";

export class FindModulesById {
    private readonly _repository: IModuleRepository;

    constructor(repository: IModuleRepository) {
        this._repository = repository;
    }

    async execute(id: number): Promise<IModule> {
        return await this._repository.findModulesById(id);
    }
}