import { Controller, Post, Body, Req } from '@nestjs/common';
import { DataService } from './data.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';

@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get-encrypt-data')
  async encryptData(@Body() encryptDataDto: EncryptDataDto, @Req() req: Request): Promise<any> {
    const privateKeyRSA = process.env.PRIVATE_KEY;
    const aesKey = this.dataService.generateRandomAESKey();
    const encryptedPayload = this.dataService.encryptWithAES(encryptDataDto.payload, aesKey);
    const encryptedAESKey = this.dataService.encryptWithPrivateKey(aesKey, privateKeyRSA);
    return {
      successful: true,
      data: { data1: encryptedAESKey, data2: encryptedPayload }
    };
  }

  @Post('get-decrypt-data')
  async decryptData(@Body() decryptDataDto: DecryptDataDto, @Req() req: Request): Promise<any> {
    const publicKeyRSA = process.env.PUBLIC_KEY;
    const decryptedAESKey = this.dataService.decryptWithPublicKey(decryptDataDto.data1, publicKeyRSA);
    const decryptedPayload = this.dataService.decryptWithAES(decryptDataDto.data2, decryptedAESKey);
    
    return {
      successful: true,
      error_code: null,
      data: {
        payload: decryptedPayload,
      }
    };
  }
}
