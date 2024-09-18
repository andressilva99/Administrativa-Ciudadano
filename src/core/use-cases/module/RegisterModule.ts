import { IModuleRepository } from "../../interfaces/IModuleRepository";
import { AModule } from '../../entities/module/IModule';

export class RegisterModule {
  private readonly _repository: IModuleRepository;

  constructor(repository: IModuleRepository) {
    this._repository = repository;
  }

  async registerModule(module: AModule): Promise<void> {
    await this._repository.registerModule(module);
  }
}
