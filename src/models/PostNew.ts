import {Post} from "../entity/Post";

type Errors = {
  title: string[];
  content: string[];
}

export class PostNew extends Post {
  async validate() {
    const {title, content} = this
    const errors: Errors = {
      title: [],
      content: [],
    }
    if (!title || title.trim() === '') {
      errors.title.push('标题不能为空')
    }
    if (!content || content.trim() === '') {
      errors.content.push('内容不能为空')
    }
    return Object.values(errors).find(i => i.length > 0) ? errors : null
  }
}
