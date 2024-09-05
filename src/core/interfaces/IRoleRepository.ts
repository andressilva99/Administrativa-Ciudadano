import { IRole } from '../entities/role/IRole';
import { Permission } from '../entities/role/Permission';

export interface IRoleRepository {
  findRoles(
    idModule: string,
    page: number,
    size: number,
  ): Promise<{ list: IRole[]; total: number }>;
  findRoleById(id: number): Promise<IRole>;
  registerRole(
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<void>;
}
