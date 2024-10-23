import { stationService, StationService } from "../service/station.service";

export class FindStationUseCase {
  private _service: StationService;

  constructor() {
    this._service = stationService;
  }

  public async execute(size: number, page: number) {
    return await this._service.getByPage(size, page );
  }
}

export const findStationUseCase = new FindStationUseCase();
