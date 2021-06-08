import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import {Comment} from "./Comment";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @Column('date', {
    default: "now()"
  })
  createdAt: string;

  @Column('date', {
    default: "now()"
  })
  updatedAt: string;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToMany(type=> Comment, comment => comment.post)
  comments: Comment[];
}