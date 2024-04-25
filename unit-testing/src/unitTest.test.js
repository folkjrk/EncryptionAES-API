import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('mergeArrays', () => {
    it('should call appService.merge with correct parameters', () => {
      const mockResult = [5, 4, 3, 2, 1];
      const mockCollections = [[5, 4, 3], [2, 1], [0]];
      const mockMerge = jest.spyOn(appService, 'merge').mockImplementation(() => mockResult);

      expect(appController.mergeArrays('[]', '[]', '[]')).toEqual(mockResult);
      expect(mockMerge).toHaveBeenCalledWith([], [], []);
    });
  });
});
