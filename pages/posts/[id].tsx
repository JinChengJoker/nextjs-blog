import dbConnectionPromise from "../../lib/dbConnection";
import {Post} from "src/entity/Post";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

type Props = {
  post: Post
}

type Params = {
  id: string;
}

const PostPage = (props: Props) => {
  const {post} = props
  return (
    <div>
      <h2>{post.title}</h2>
      <article>
        {post.content}
      </article>
    </div>
  )
}

export default PostPage;

export const getServerSideProps: GetServerSideProps<object, Params> = async (context) => {
  const connection = await dbConnectionPromise
  const postRepository = connection.getRepository(Post)
  const post = await postRepository.findOne(context.params?.id)
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    },
  }
}
