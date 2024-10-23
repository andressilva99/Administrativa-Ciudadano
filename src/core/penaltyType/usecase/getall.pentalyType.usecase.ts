import { penaltyTypeService, PenaltyTypeService } from "../service/penaltyType.service";

export class GetAllPentalyTypeUseCase {
    private _service: PenaltyTypeService;

    constructor() {
        this._service = penaltyTypeService;
    }

    public async execute(size: number, page: number) {
        return await this._service.getAll(size, page);
    }
}

export const getAllPentalyTypeUseCase = new GetAllPentalyTypeUseCase();