import { UserRole } from 'src/auth/user.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends ExtendUser {}
  }
}

export interface ExtendUser {
  uuid: string;
  id: UserRole;
  email: string;
  name: string;
}
