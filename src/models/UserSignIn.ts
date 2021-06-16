import {User} from 'src/entity/User'
import dbConnectionPromise from "lib/dbConnection";
import md5 from "md5";

type Errors = {
  username: string[];
  password: string[];
}

export class UserSignIn extends User {
  async validate() {
    const {username, password} = this
    const errors: Errors = {
      username: [],
      password: [],
    }
    if (!username || username.trim() === '') {
      errors.username.push('请输入用户名')
    }
    if (!password || password.trim() === '') {
      errors.password.push('请输入密码')
    }
    if (!errors.username.length && !errors.password.length) {
      const connection = await dbConnectionPromise
      const userRepository = connection.getRepository(User)
      const user = await userRepository.findOne({username})
      if(user) {
        if(user.password !== md5(password)) {
          errors.password.push('用户名与密码不匹配')
        } else {
          this.id = user.id
        }
      } else {
        errors.username.push('用户名不存在')
      }
    }
    return Object.values(errors).find(i => i.length > 0) ? errors : null
  }
}