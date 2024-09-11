import { IRole, IRoleAdd, ERole} from '../entities/role/IRole';


export interface IRoleRepository {
  findRoles(
    idModule: string,
    page: number,
    size: number,
  ): Promise<{ list: IRole[]; total: number }>;
  findRoleById(id: number): Promise<IRole>;
  registerRole(role: IRoleAdd): Promise<void>;
  editRole(id: number, updatedRole: ERole): Promise<void>;
}
