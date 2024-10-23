import { stationService, StationService } from '../service/station.service';
import { EStation } from '../../entities/station/IStation'; 

export class EditStationUseCase {
  private _service: StationService;

  constructor() {
    this._service = stationService;
  }

  public async execute(stationData: EStation): Promise<EStation> {
    try {
      const response = await this._service.editStation(stationData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const editStationUseCase = new EditStationUseCase();