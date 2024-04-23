import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class DataService {
    encryptData(payload: string): any {
 
    }
    
      decryptData(data1: string, data2: string): any {
        // Implement decryption logic here
      }
}
