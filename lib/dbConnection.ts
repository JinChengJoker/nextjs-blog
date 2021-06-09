import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import config from 'ormconfig.json'
import {User} from "../src/entity/User";
import {Post} from "src/entity/Post";
import {Comment} from "../src/entity/Comment";

const create = async () => {
  console.log('创建connection')
  // @ts-ignore
  return await createConnection({
    ...config,
    entities: [Post, User, Comment]
  })
}

const dbConnectionPromise = (async () => {
  try {
    const connection = getConnection()
    console.log('关闭connection')
    await connection.close()
  } catch (e) {
  }
  return create()
})()

export default dbConnectionPromise
