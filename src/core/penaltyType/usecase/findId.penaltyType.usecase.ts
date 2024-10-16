import { penaltyTypeService, PenaltyTypeService } from '../service/penaltyType.service';
import { IPenaltyTypeData } from '../../entities/penaltyType/IPenaltyType';

export class FindByIdPenaltyTypeUseCase {
  private _service: PenaltyTypeService;

  constructor() {
    this._service = penaltyTypeService;
  }

  public async execute(id: number): Promise<IPenaltyTypeData> {
    return await this._service.findById(id);
  }
}

export const findByIdPenaltyTypeUseCase = new FindByIdPenaltyTypeUseCase();
