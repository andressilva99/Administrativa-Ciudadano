import { IAuthRepository } from "../interfaces/IAuthRepository";
import { ModuleResponse} from "../entities/IModuleFind";

export class FindModules {
  private _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async findModules(page: number, size: number): Promise<ModuleResponse> {
    return await this._repository.findModules(page, size);
  }
}