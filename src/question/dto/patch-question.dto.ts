import { ApiProperty } from '@nestjs/swagger';

export class PatchQuestion {
  @ApiProperty({ type: String })
  answer: string;
}
