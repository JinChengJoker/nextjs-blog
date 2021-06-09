import {GetServerSideProps, NextPage} from "next";
import Link from 'next/link'
import dbConnectionPromise from 'lib/dbConnection'
import {Post} from "src/entity/Post";

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
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsIndex

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await dbConnectionPromise
  const postRepository = connection.getRepository(Post)
  const posts = await postRepository.find()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}