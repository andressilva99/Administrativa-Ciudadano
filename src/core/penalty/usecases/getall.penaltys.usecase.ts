import { penaltyService, PenaltyService } from '../../penalty/service/penalty.service';

export class GetAllPenaltysUseCase {
  private _service: PenaltyService;

  constructor() {
    this._service = penaltyService;
  }

  public async execute(property: string, search: string, size: number, page: number, issuedDateFrom: string, issuedDateTo: string, ) {
    return await this._service.getByPage(property, search, size, page, issuedDateFrom, issuedDateTo );
  }
}

export const getAllPenaltysUseCase = new GetAllPenaltysUseCase();
