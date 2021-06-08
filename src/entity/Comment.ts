import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  
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

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;
}