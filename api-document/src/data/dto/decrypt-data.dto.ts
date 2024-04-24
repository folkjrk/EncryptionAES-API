import { ApiProperty } from '@nestjs/swagger';
export class DecryptDataDto {
    @ApiProperty()
    data1: string;
    @ApiProperty()
    data2: string;
  }