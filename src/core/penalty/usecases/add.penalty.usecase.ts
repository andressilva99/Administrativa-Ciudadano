import { penaltyService, PenaltyService } from '../service/penalty.service';
import { IPenaltyAdd } from '../../entities/penalty/IPentalty';

export class AddPenaltyUseCase {
  private _service: PenaltyService;

  constructor() {
    this._service = penaltyService;
  }

  public async execute(penaltyData: IPenaltyAdd): Promise<IPenaltyAdd> {
    try {
      const response = await this._service.addPenalty(penaltyData);
      console.log(response);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}

export const addPenaltyUseCase = new AddPenaltyUseCase();
