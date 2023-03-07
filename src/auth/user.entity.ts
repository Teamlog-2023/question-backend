import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum UserRole {
  Layer7 = 0,
  Teamlog = 1,
  Emotion = 2,
  Nefus = 3,
  Unifox = 4,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.Layer7,
  })
  id: UserRole;

  @Column('text')
  name: string;

  @Column('text')
  email: string;
}
