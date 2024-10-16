import { penaltyTypeService } from "../service/penaltyType.service";

export class DeletePenaltyTypeUseCase {
  public async execute(id: number): Promise<void> {
    try {
      await penaltyTypeService.deletePenaltyType(id);
    } catch (error) {
      console.error('Error deleting penalty type:', error);
      throw error;
    }
  }
}

export const deletePenaltyTypeUseCase = new DeletePenaltyTypeUseCase();

