export interface IStationUserResponse {
  list: IStationUserData[];
  total: number;
  size: number;
}

export interface IStationUserData {
      id: number;
      name: string;
      address: string;
      enabled: boolean;
      horarioString: string;
      usersInStation: IUserStationData[];
      tsi: string;
      tsu: string;
}

export interface IUserStationData {
    id: number;
    idAdmUser: number;
    idStation: number;
    dateAssigned: string;
    dateUnassigned: string;
    infoAdmuserName: string;
}