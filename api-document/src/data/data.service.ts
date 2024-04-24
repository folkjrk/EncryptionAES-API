import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

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

  encryptWithAES(payload: string, key: string) {
    const cipherWithAES = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from("602d907fc6e6c7ffe50327b0f6b1abfd", 'hex'));
    let encrypted = cipherWithAES.update(payload, 'utf-8', 'base64');
    encrypted += cipherWithAES.final('base64');
    return encrypted;
  }

  encryptWithPrivateKey(data: string, rsaPrivateKey: string) {
    try {
      // Encrypt the data using the private key
      const encryptedData = crypto.privateEncrypt(
        {
          key: rsaPrivateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(data)
      );
  
      // Return the encrypted data
      return encryptedData.toString('base64');
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to encrypt data with provided private key.');
    }
  }

  decryptWithPublicKey(encryptedAES: string, publicKey: string): string {
    try {
      const encryptedAESBuffer = Buffer.from(encryptedAES, 'base64');
      // Decrypt the encrypted AES data using the RSA public key
      const decryptedAES = crypto.publicDecrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
       encryptedAESBuffer
      );
  
      // Return the decrypted data 
      return decryptedAES.toString();
    } catch (error) {
      console.error(error)
      throw new BadRequestException('Failed to decrypt data with provided public key.');
    }
  
  }
  decryptWithAES(encryptedData: string, decryptedKey: string) {
    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(decryptedKey,'hex'), Buffer.from("602d907fc6e6c7ffe50327b0f6b1abfd", 'hex')); // Initialization vector length is 16 bytes
      let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to decrypt data with provided AES key.');
    }
  }

}
