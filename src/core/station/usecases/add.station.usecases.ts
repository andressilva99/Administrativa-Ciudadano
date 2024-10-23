import { stationService, StationService } from '../service/station.service';
import { AStation } from '../../entities/station/IStation';

export class AddStationUseCase {
  private _service: StationService;

  constructor() {
    this._service = stationService;
  }

  public async execute(stationData: AStation): Promise<AStation> {
    try {
      const response = await this._service.addStation(stationData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const addStationUseCase = new AddStationUseCase();