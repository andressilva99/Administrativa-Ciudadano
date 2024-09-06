import { IRole } from '../entities/role/IRole';
import { IRoleAdd } from '../entities/role/IRoleAdd';

export interface IRoleRepository {
  findRoles(
    idModule: string,
    page: number,
    size: number,
  ): Promise<{ list: IRole[]; total: number }>;
  findRoleById(id: number): Promise<IRole>;
  registerRole(role: IRoleAdd): Promise<void>;
}
