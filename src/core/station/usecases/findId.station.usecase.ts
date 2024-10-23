import { stationService, StationService } from '../service/station.service';
import { ByIdStation } from '../../entities/station/IStation';

export class FindByIdStationUseCase {
  private _service: StationService;

  constructor() {
    this._service = stationService;
  }

  public async execute(id: number): Promise<ByIdStation> {
    return await this._service.findById(id);
  }
}

export const findByIdStationUseCase = new FindByIdStationUseCase();
