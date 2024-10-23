import { stationUserService, StationUserService } from "../services/stationUser.service";

export class GetAllStationUserUseCase {
    private _service: StationUserService;
    
    constructor() {
        this._service = stationUserService;
    }

    public async execute(size: number, page: number) {
        return await this._service.getAll(size, page);
    }
}

export const getAllStationUserUseCase = new GetAllStationUserUseCase();