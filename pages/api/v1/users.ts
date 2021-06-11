import {NextApiHandler} from "next";
import {User} from "src/entity/User";
import dbConnectionPromise from "lib/dbConnection";

const users: NextApiHandler = async (req, res) => {
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
      res.write(JSON.stringify({error: errors}))
    } else {
      const connection = await dbConnectionPromise
      const userRepository = connection.getRepository(User)
      await userRepository.save(user)
      res.status(200)
      res.write(JSON.stringify({user: user.omit()}))
    }
  } else {
    res.status(404)
  }
  res.end()
}

export default users