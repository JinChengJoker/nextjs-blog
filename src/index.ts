import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
import {Comment} from "./entity/Comment";

createConnection()
  .then(async connection => {
    const {manager} = connection

    const user = new User()
    user.username = 'JinCheng'
    user.password = '123456'
    await manager.save(user)

    const post = new Post()
    post.title = 'Hello World!'
    post.content = 'Hello NextJs!'
    post.user = user
    await manager.save(post)

    const comment = new Comment()
    comment.content = 'Awesome!'
    comment.user = user
    comment.post = post
    await manager.save(comment)

    await connection.close()
  })
  .catch(error => console.log(error));