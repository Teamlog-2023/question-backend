import { UserRole } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  id: UserRole;

  @Column('text')
  question: string;

  @Column('text', { nullable: true })
  answer?: string;

  @CreateDateColumn()
  createdAt: Date;
}
