import { penaltyService, PenaltyService } from '../service/penalty.service';
import { IPenaltyData } from '../../entities/penalty/IPentalty';

export class FindByIdPenaltyUseCase {
  private _service: PenaltyService;

  constructor() {
    this._service = penaltyService;
  }

  public async execute(id: number): Promise<IPenaltyData> {
    return await this._service.findById(id);
  }
}

export const findByIdPenaltyUseCase = new FindByIdPenaltyUseCase();
