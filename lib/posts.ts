import path from "path";
import fs, {promises as fsPromises} from "fs";
import matter from 'gray-matter'
import marked from "marked";

const postsDir = path.join(process.cwd(), 'markdown')

export const readPosts = async () => {
  const filenames = await getPostFilenames()
  return filenames.map(filename => {
    const text = fs.readFileSync(path.join(postsDir, `${filename}.md`))
    const {data: {title, date}, content} = matter(text)
    return {
      filename,
      title,
      date: date.toLocaleString().split(' ')[0],
      content
    }
  })
}

export const getPostFilenames = async () => {
  const filenames = await fsPromises.readdir(postsDir)
  return filenames.map(filename => filename.replace(/\.md$/, ''))
}

export const readPost = async (filename: string) => {
  const text = fs.readFileSync(path.join(postsDir, `${filename}.md`))
  const {data: {title, date}, content} = matter(text)
  const contentHTML = marked(content)
  return {
    filename,
    title,
    date: date.toLocaleString().split(' ')[0],
    content,
    contentHTML
  }
}
