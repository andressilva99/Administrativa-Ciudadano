import { stationUserService, StationUserService } from "../services/stationUser.service";

export class AddStationUserUseCase {
    private _service: StationUserService;

    constructor() {
        this._service = stationUserService;
    }

    public async execute(stationId: number, userId: number): Promise<any> {
        try {
            const response = await this._service.addStationUser(stationId, userId);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export const addStationUserUseCase = new AddStationUserUseCase();