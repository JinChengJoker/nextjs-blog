import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('smallint')
  gender: number;

  @Column('int')
  age: number;
}