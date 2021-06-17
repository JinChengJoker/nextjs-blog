import {NextApiHandler} from "next";
import {readPosts} from 'lib/posts'
import {PostNew} from "src/models/PostNew";
import {ironSession} from "lib/ironSession";
import dbConnectionPromise from "lib/dbConnection";
import {Post} from "src/entity/Post";

const posts: NextApiHandler = ironSession(async (req, res) => {
  const user = req.session.get('user')
  if (user) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (req.method === 'GET') {
      const posts = await readPosts()
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(posts))
    } else if (req.method === 'POST') {
      const {title, content} = req.body
      const post = new PostNew()
      post.title = title
      post.content = content
      const errors = await post.validate()
      if (errors) {
        res.status(422)
        res.json({error: errors})
      } else {
        const connection = await dbConnectionPromise
        const postRepository = connection.getRepository(Post)
        post.user = user
        await postRepository.save(post)
        res.json(post)
      }
    } else {
      res.status(404)
    }
  } else {
    res.status(401)
  }
  res.end()
})

export default posts