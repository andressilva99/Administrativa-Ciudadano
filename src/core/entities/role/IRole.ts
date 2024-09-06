import { Permission } from './Permission';

export interface IRole {
  id: number;
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
}