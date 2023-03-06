import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ enum: UserRole })
  id: UserRole;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  name: string;
}
