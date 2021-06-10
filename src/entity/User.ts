import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import dbConnectionPromise from "lib/dbConnection";

type Errors = {
  username: string[];
  password: string[];
  passwordRepeat: string[];
}

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

  passwordRepeat: string;

  async validate() {
    const {username, password, passwordRepeat} = this
    const errors: Errors = {
      username: [],
      password: [],
      passwordRepeat: [],
    }
    console.log('username')
    console.log(username)
    if (username.trim() === '') {
      errors.username.push('用户名不能为空')
    }
    if (username.length < 6) {
      errors.username.push('用户名不能少于6个字符')
    }
    if (username.length > 24) {
      errors.username.push('用户名不能大于24个字符')
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username.push('用户名只能包含大写字母、小写字母和下划线')
    }
    if (errors.username.length === 0) {
      const connection = await dbConnectionPromise
      const userRepository = connection.getRepository(User)
      const user = await userRepository.findOne({username})
      user && errors.username.push('用户名已存在')
    }
    if (password.trim() === '') {
      errors.password.push('密码不能为空')
    }
    if (password.length < 6) {
      errors.password.push('密码不能少于6个字符')
    }
    if (password.length > 24) {
      errors.password.push('密码不能大于24个字符')
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      errors.password.push('密码只能包含大写字母、小写字母和下划线')
    }
    if (passwordRepeat.trim() === '') {
      errors.passwordRepeat.push('请再次输入密码')
    }
    if (password !== passwordRepeat) {
      errors.passwordRepeat.push('两次输入的密码不一致')
    }
    return Object.values(errors).find(i => i.length > 0) ? errors : null
  }
}