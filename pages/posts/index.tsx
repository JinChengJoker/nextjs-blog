import {readPosts} from "lib/posts";
import {NextPage} from "next";
import Link from 'next/link'

type Props = {
  posts: Post[];
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <>
      <h1>文章列表</h1>
      <ul>
        {posts.map(post => (
          <li key={post.filename}>
            <Link href={`/posts/${post.filename}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
  const posts = await readPosts()
  return {
    props: {
      posts
    }
  }
}