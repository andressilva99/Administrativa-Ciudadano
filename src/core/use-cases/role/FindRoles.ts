import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { IRole } from '../../entities/role/IRole';

export class FindRoles {
  private readonly _repository: IRoleRepository;

  constructor(repository: IRoleRepository) {
    this._repository = repository;
  }

  async findRoles(
    idModule: string,
    page: number,
    size: number,
  ): Promise<{ list: IRole[]; total: number }> {
    return await this._repository.findRoles(idModule, page, size);
  }
}
