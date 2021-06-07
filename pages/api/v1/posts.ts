import {NextApiHandler} from "next";
import {readPosts} from 'lib/posts'

const posts: NextApiHandler = async (req, res) => {
  const posts = await readPosts()
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(posts))
  res.end()
}

export default posts