import { ApiProperty } from '@nestjs/swagger';
export class EncryptDataDto {
    @ApiProperty()
    payload: string;
  }