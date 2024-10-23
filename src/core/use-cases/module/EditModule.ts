import { IModuleRepository } from "../../interfaces/IModuleRepository";
import { EModule } from "../../entities/module/IModule";

export class EditModule {
    private readonly _repository: IModuleRepository;

    constructor(repository: IModuleRepository) {
        this._repository = repository;
    }

    // Refactorizamos el método para recibir un objeto de tipo EModule
    async editModule(module: EModule): Promise<void> {
        // Llama al repositorio con el objeto completo
        await this._repository.editModule(module);
    }
}