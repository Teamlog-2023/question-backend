import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/auth/user.entity';

export class createQuestion {
  @ApiProperty({ enum: UserRole })
  id: UserRole;

  @ApiProperty({ type: String })
  question: string;
}
