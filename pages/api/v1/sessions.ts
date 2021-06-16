import {UserSignIn} from "src/models/UserSignIn";
import {ironSession} from "lib/ironSession";

const handler = ironSession(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method === 'POST') {
    const {username, password} = req.body;
    const user = new UserSignIn()
    user.username = username
    user.password = password
    const errors = await user.validate()
    if (errors) {
      res.status(422)
      res.json({error: errors})
    } else {
      req.session.set('user', user.omit())
      await req.session.save();
      res.status(200)
      res.json({user: user.omit()})
    }
  } else {
    res.status(404)
  }
  res.end()
})

export default handler