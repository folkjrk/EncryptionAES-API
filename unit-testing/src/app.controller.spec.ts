import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('mergeArrays', () => {
    it('should call appService.merge with correct parameters', () => {
           const collection1 = [10, 8, 6, 4, 2];
           const collection2 = [1, 3, 5, 7, 9];
           const collection3 = [0, 1, 2, 3, 4];
           const expected = [10, 9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0];
     
           const result = appService.merge(collection1, collection2, collection3);
           expect(result).toEqual(expected);
     
    });
  });
});
