import { Controller, Post, Body, Req } from '@nestjs/common';
import { DataService } from './data.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { Request } from 'express';

@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get-encrypt-data')
  async encryptData(@Body() encryptDataDto: EncryptDataDto, @Req() req: Request): Promise<any> {
    const privateKey = process.env.PRIVATE_KEY;
    const aesKey = this.dataService.generateRandomAESKey();
    this.dataService.storeAESKeyInSession(req, aesKey); // Store AES key in session
    const encryptedPayload = this.dataService.encryptWithAES(encryptDataDto.payload, aesKey);
    const encryptedAESKey = this.dataService.encryptWithPrivateKey(aesKey, privateKey);
    return {
      successful: true,
      data: { data1: encryptedAESKey, data2: encryptedPayload }
    };
  }

  @Post('get-decrypt-data')
  async decryptData(@Body() decryptDataDto: DecryptDataDto, @Req() req: Request): Promise<any> {
    const publicKey = process.env.PUBLIC_KEY;
    const aesKeyFromSession = this.dataService.getAESKeyFromSession(req); // Retrieve AES key from session
    const decryptedAESKey = this.dataService.decryptWithPrivateKey(decryptDataDto.data1, aesKeyFromSession, publicKey);
    const decryptedPayload = this.dataService.decryptWithAES(decryptDataDto.data2, aesKeyFromSession || decryptedAESKey);
    return {
      successful: true,
      error_code: null,
      data: {
        payload: decryptedAESKey,
      }
    };
  }
}
