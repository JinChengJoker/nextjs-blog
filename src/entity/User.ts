import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
}