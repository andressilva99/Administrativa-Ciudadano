//Find
export interface IModule {
    id: number;
    code: string;
    name: string;
    description: string;
    enableNp: boolean;
    enableLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
    configuraciones: {
        empty: boolean;
      };
}
//Edit
export interface EditModuleProps {
    moduleId: number;
  onCancel: () => void;
}
export interface EModule {
  id: number | null;
  moduleId: number | null;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number | null;
  minLpLevel: number | null;
  uiOrder: number;
  configuraciones: Configuraciones;
}
//ICON
interface Icon {
  prefix: string;
  name: string;
  path: string | null;
}

interface Configuraciones {
  description: string;
  linkUrl: string;
  icon: Icon;
  deepLinkPackageAndroid: string | null;
  deepLinkPackageIOS: string | null;
  deepLinkValue: string | null;
  deepLinkValueAsUri: boolean;
  linkToExternalBrowser: boolean;
}
//ById
export interface ByIdModule {
    id: number;
    code: string;
    moduleType: string;
    name: string;
    enabledNp: boolean;
    enabledLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
  configuraciones: {
    empty: boolean;
  };
}
export interface ModuleByIdProps {
    id: number;
}
//ByCode
export interface ByCodeModule {
    id: number;
    code: string;
    moduleType: string;
    name: string;
    enabledNp: boolean;
    enabledLp: boolean;
    minNpLevel: number;
    minLpLevel: number;
    configuraciones: {
      empty: boolean;
    };
}
export interface ModuleDetailProps {
    code: string;
}
//ADD 

