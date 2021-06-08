import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
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

  @Column('date', {
    default: "now()"
  })
  createdAt: string;

  @Column('date', {
    default: "now()"
  })
  updatedAt: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
}