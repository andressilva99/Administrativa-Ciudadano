import { IModuleRepository } from "../../interfaces/IModuleRepository";
import { IModule } from "../../entities/module/IModule";

export class FindModules {
    private readonly _repository: IModuleRepository;

    constructor(repository: IModuleRepository) {
        this._repository = repository;
    }

    async findModules(page: number, size: number): Promise<IModule[]> {
        return await this._repository.findModules(page, size);
    }

}