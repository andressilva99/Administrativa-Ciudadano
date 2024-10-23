import { bikeService } from "../service/bike.service";

export class DeleteBikeUseCase {
  public async execute(id: number): Promise<void> {
    try {
      await bikeService.deleteBike(id);
    } catch (error) {
      console.error('Error deleting penalty type:', error);
      throw error;
    }
  }
}

export const deleteBikeUseCase = new DeleteBikeUseCase();