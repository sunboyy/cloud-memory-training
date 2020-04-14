import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Calculation {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column('int', { name: 'factor_a' })
  factorA: number;

  @Column('int', { name: 'factor_b' })
  factorB: number;

  @Column('varchar', { length: 50 })
  operator: string;

  @Column('varchar', { length: 20 })
  difficulty: string;

  @Column('int')
  answer: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  signature: string;
}
