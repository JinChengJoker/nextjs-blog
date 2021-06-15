import {
  Entity,
  BeforeInsert
} from "typeorm";
import {User} from 'src/entity/User'
import dbConnectionPromise from "lib/dbConnection";
import md5 from "md5";

type Errors = {
  username: string[];
  password: string[];
  passwordRepeat: string[];
}

@Entity('users')
export class UserSignUp extends User {
  passwordRepeat: string;

  @BeforeInsert()
  md5Password() {
    this.password = md5(this.password)
  }

  async validate() {
    const {username, password, passwordRepeat} = this
    const errors: Errors = {
      username: [],
      password: [],
      passwordRepeat: [],
    }
    if (!username || username.trim() === '') {
      errors.username.push('用户名不能为空')
    } else {
      if (username.length < 6) {
        errors.username.push('用户名不能少于6个字符')
      }
      if (username.length > 24) {
        errors.username.push('用户名不能大于24个字符')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username.push('用户名只能包含大写字母、小写字母和下划线')
      }
    }
    if (errors.username.length === 0) {
      const connection = await dbConnectionPromise
      const userRepository = connection.getRepository(User)
      const user = await userRepository.findOne({username})
      user && errors.username.push('用户名已存在')
    }
    if (!password || password.trim() === '') {
      errors.password.push('密码不能为空')
    } else {
      if (password.length < 6) {
        errors.password.push('密码不能少于6个字符')
      }
      if (password.length > 24) {
        errors.password.push('密码不能大于24个字符')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(password)) {
        errors.password.push('密码只能包含大写字母、小写字母和下划线')
      }
    }
    if (!passwordRepeat || passwordRepeat.trim() === '') {
      errors.passwordRepeat.push('请确认密码')
    } else if (password !== passwordRepeat) {
      errors.passwordRepeat.push('两次输入的密码不一致')
    }
    return Object.values(errors).find(i => i.length > 0) ? errors : null
  }
}