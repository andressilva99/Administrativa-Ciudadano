import { StationUserService, stationUserService } from '../services/stationUser.service';
import { IStationUserData } from '../../entities/stationUser/IStationuser';

export class FindByIdStationUserUseCase {
  private _service: StationUserService;

  constructor() {
    this._service = stationUserService;
  }

  public async execute(id: number): Promise<IStationUserData> {
    return await this._service.findById(id);
  }
}

export const findByIdStationUserUseCase = new FindByIdStationUserUseCase();
