import { IRole } from '../entities/role/IRole';
import { Permission } from '../entities/role/Permission';

export interface IRoleRepository {
  findRoles(moduleCode: string, page: number, size: number): Promise<IRole[]>;
  findRoleById(id: number): Promise<IRole>;
  registerRol(
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<void>;
}
