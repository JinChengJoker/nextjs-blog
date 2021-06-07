import {getPostFilenames, readPost} from "../../lib/posts";

type StaticPaths = {
  params: {
    filename: string;
  }
}

type Props = {
  post: Post
}

const Post = (props: Props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.contentHTML}} />
    </div>
  )
}

export default Post;

export const getStaticPaths = async () => {
  const filenames = await getPostFilenames()
  return {
    paths: filenames.map(filename => ({
      params: {
        filename
      }
    })),
    fallback: false,
  }
}

export const getStaticProps = async (staticPaths: StaticPaths) => {
  const {params: {filename}} = staticPaths
  const post = await readPost(filename)
  return {
    props: {post},
  }
}
