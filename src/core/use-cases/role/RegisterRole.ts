import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { Permission } from '../../entities/role/Permission';

export class RegisterRole {
  private readonly _repository: IRoleRepository;

  constructor(repository: IRoleRepository) {
    this._repository = repository;
  }

  async registerRole(
    idModule: number,
    name: string,
    description: string,
    permissionList: Permission[],
  ): Promise<void> {
    await this._repository.registerRol(idModule, name, description, permissionList);
  }
}
