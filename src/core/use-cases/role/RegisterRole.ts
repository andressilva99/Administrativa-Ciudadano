import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { IRole } from '../../entities/role/IRole';

export class RegisterRole {
  private readonly _repository: IRoleRepository;

  constructor(repository: IRoleRepository) {
    this._repository = repository;
  }

  async registerRole(role: IRole): Promise<void> {
    const { idModule, name, description, permissionsList } = role;
    await this._repository.registerRole(idModule, name, description, permissionsList);
  }
}
