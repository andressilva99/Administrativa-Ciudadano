import { IModuleRepository } from "../../interfaces/IModuleRepository";

export class EditModule {
    private readonly _repository: IModuleRepository;

    constructor(repository: IModuleRepository) {
        this._repository = repository;
    }

    async execute(
        moduleId: number, 
        enableNp: boolean,
        enableLp: boolean,
        minNpLevel: number,
        minLpLevel: number,
    ) : Promise<void> {
        await this._repository.editModule(moduleId, enableNp, enableLp, minNpLevel, minLpLevel);
    }
}