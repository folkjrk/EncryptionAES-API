import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Session } from 'express-session'; 

@Injectable()
export class DataService {
  
  validateEncryptPayload(payload: string) {
    if (!payload || typeof payload !== 'string' || payload.length < 1 || payload.length > 2000) {
      throw new BadRequestException('Payload must be a non-empty string with length between 1 and 2000 characters.');
    }
  }

  validateDecryptPayload(data1: string, data2: string) {
    if (!data1 || !data2 || typeof data1 !== 'string' || typeof data2 !== 'string') {
      throw new BadRequestException('Both data1 and data2 must be non-empty strings.');
    }
  }

  generateRandomAESKey() {
    return crypto.randomBytes(32).toString('hex'); // AES key length is 32 bytes
  }
  // Store AES key in session
  storeAESKeyInSession(req: any, aesKey: string) {
    req.session.aesKey = aesKey;
  }
  
  // Retrieve AES key from session
  getAESKeyFromSession(req: any): string {
    return req.session.aesKey;
  }

  encryptWithAES(payload: string, key: string) {
    const cipherWithAES = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), crypto.randomBytes(16));
    let encrypted = cipherWithAES.update(payload, 'utf-8', 'base64');
    encrypted += cipherWithAES.final('base64');
    return encrypted;
  }

  encryptWithPrivateKey(data: string, rsaPrivateKey: string) {
    const aesKey = crypto.createHash('sha256').update(Buffer.from(rsaPrivateKey, 'base64')).digest().slice(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, crypto.randomBytes(16));
    return Buffer.concat([cipher.update(data), cipher.final()]).toString('base64');
  }

  decryptWithPrivateKey( decryptData: string, aesKeyFormSession: string, publicKey: string) {
    try {
      const aesKeyBuffer = Buffer.from(aesKeyFormSession, 'base64');
      const rsaPrivateKeyBuffer = Buffer.from(publicKey, 'base64');
      const decryptedAesKey = crypto.publicDecrypt(
        {
          key: rsaPrivateKeyBuffer,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        aesKeyBuffer
      );

      const decipher = crypto.createDecipheriv('aes-256-cbc', decryptedAesKey, Buffer.alloc(16));
      let decrypted = decipher.update(decryptData, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      throw new BadRequestException('Failed to decrypt data with provided public key.');
    }
  
  }

  decryptWithAES(data: string, key: string) {
    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.alloc(16)); // Initialization vector length is 16 bytes
      let decrypted = decipher.update(data, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      throw new BadRequestException('Failed to decrypt data with provided AES key.');
    }
  }

}
