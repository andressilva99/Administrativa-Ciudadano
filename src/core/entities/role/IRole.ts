import { Permission } from './Permission';

export interface IRole {
  id: number;
  idRol: number | null;
  name: string;
  description: string;
  idModule: number;
  permissionsList: PermissionItem[]; 
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
}

export interface PermissionItem {  
  name: Permission;
  description: string;
  active?: boolean; 
}
export interface RoleResponse {
  list: IRole[];
  total: number;
  
}
//ADD ROLE
export interface IRoleAdd {
  idModule: number,
  name: string,
  description: string,
  permissionsList: APermissionItem[];
}
export interface APermissionItem {  
  name: Permission; 
  description: string; 
  active?: boolean; 
}

export interface AddRoleProps {
  onRoleAdded: () => void;
  onCancel: () => void;
  
}


//EDIT ROLE 
export interface ERole {
  id: number | null;
  idRol: number | null;
  name: string;
  description: string;
  idModule: number | null;
  permissionsList: EPermissionItem[]; 
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
}

export interface EPermissionItem {  
  name: Permission; 
  description: string; 
  active?: boolean; 
}
export interface EditRoleProps {
  roleId: number;
  onCancel: () => void;
  onEditSuccess: () => void;
}