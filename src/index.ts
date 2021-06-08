import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection()
  .then(connection => {
    // 这里可以写实体操作相关的代码
    console.log(connection)
  })
  .catch(error => console.log(error));