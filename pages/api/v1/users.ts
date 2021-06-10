import {NextApiHandler} from "next";
import dbConnectionPromise from "lib/dbConnection";
import {User} from "src/entity/User";

const users: NextApiHandler = async (req, res) => {
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method === 'POST') {
    const {username, password, passwordRepeat} = req.body;
    const user = new User()
    user.username = username
    user.password = password
    user.passwordRepeat = passwordRepeat
    const errors = await user.validate()
    if (errors) {
      res.status(422)
      res.write(JSON.stringify(errors))
    } else {
      res.status(200)
      res.write('ok!')
    }
  } else {
    res.status(404)
  }
  res.end()
}

export default users