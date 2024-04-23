import { Controller, Post, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Test Module')
@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get-encrypt-data')
  async getEncryptData(@Body() encryptDataDto: EncryptDataDto): Promise<any> {
    // Implement validation of request payload here
    const encryptedData = this.dataService.encryptData(encryptDataDto.payload);
    return {
      successful: true,
      error_code: null,
      data: encryptedData,
    };
  }

  @Post('get-decrypt-data')
  async getDecryptData(@Body() decryptDataDto: DecryptDataDto): Promise<any> {
    // Implement validation of request payload here
    const decryptedData = this.dataService.decryptData(decryptDataDto.data1, decryptDataDto.data2);
    return {
      successful: true,
      error_code: null,
      data: decryptedData,
    };
  }
}
