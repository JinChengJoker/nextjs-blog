import {NextApiHandler} from "next";
import {UserSignUp} from "src/models/UserSignUp";
import dbConnectionPromise from "lib/dbConnection";
import {User} from "src/entity/User";

const users: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method === 'POST') {
    const {username, password, passwordRepeat} = req.body;
    const user = new UserSignUp()
    user.username = username
    user.password = password
    user.passwordRepeat = passwordRepeat
    const errors = await user.validate()
    if (errors) {
      res.status(422)
      res.json({error: errors})
    } else {
      const connection = await dbConnectionPromise
      const userRepository = connection.getRepository(User)
      await userRepository.save(user)
      res.status(200)
      res.json({user: user.omit()})
    }
  } else {
    res.status(404)
  }
  res.end()
}

export default users