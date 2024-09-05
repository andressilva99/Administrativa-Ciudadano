import { IModule } from "../entities/module/IModule";

export interface IModuleRepository {
    findModules(page: number, size: number): Promise<IModule[]>;
    findModulesByCode(code: string): Promise<IModule>;
    findModulesById(id: number): Promise<IModule>;
    editModule(moduleId: number, enableNp: boolean, enableLp: boolean, minNpLevel: number, minLpLevel: number): Promise<void>;
}