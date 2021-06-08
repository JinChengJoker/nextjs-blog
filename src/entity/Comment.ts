import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;
}