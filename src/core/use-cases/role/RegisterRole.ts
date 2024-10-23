import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { IRoleAdd } from '../../entities/role/IRole';

export class RegisterRole {
  private readonly _repository: IRoleRepository;

  constructor(repository: IRoleRepository) {
    this._repository = repository;
  }

  async registerRole(role: IRoleAdd): Promise<void> {
    await this._repository.registerRole(role);
  }
}
