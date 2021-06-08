import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection()
  .then(async connection => {
    const user = new User()
    user.name = 'JinCheng'
    user.gender = 1
    user.age= 27
    await connection.manager.save(user)
    await connection.close()
  })
  .catch(error => console.log(error));