import { AuthRepository } from '../infrastructure/repository/AuthRepository';
import { Permission } from '../Permission';

export class AuthService {
  private _repository: AuthRepository;

  constructor() {
    this._repository = new AuthRepository();
  }

  async signin(email: string, password: string): Promise<any> {
    return await this._repository.signin(email, password);
  }

  //-----------------------------MODULOS-----------------------------------//
  async findModules(page: number, size: number): Promise<any> {
    return await this._repository.findModules(page, size);
  }

  //BUSCAR MODULO
  async findModulesByCode(code: string): Promise<any> {
    return await this._repository.findModulesByCode(code);
  }

  //BUSCAR MODULO POR ID
  async findModulesById(id: number): Promise<any> {
    return await this._repository.findModulesById(id);
  }

  //------------------------------ROLES---------------------------------//
  async findRoles(id: number, enabled: boolean, deleted: boolean, page: number, size: number): Promise<any> {
    return await this._repository.findRoles(id, enabled, deleted, page, size);
  }
  //Registrar Rol
  async registerRol(
    idModule: number,
    name: string,
    description: string,
    permissionsList: Permission[],
  ): Promise<any> {
    return await this._repository.registerRol(idModule, name, description, permissionsList);
  }
}
