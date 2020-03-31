import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column('varchar', { length: 32, unique: true })
  username?: string;

  @Column('varchar', { length: 64 })
  password?: string;
}
