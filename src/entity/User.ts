import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn, BeforeInsert,
} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import lodash from "lodash";
import md5 from "md5";

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

  @BeforeInsert()
  md5Password() {
    this.password = md5(this.password)
  }

  omit() {
    return lodash.omit(this, ['password', 'passwordRepeat'])
  }
}