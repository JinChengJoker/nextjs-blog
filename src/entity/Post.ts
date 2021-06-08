import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}