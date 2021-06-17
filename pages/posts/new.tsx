import {NextPage} from "next";
import {FormEvent, useCallback, useState} from "react";
import axios, {AxiosError} from "axios";

const initErrors = {
  title: [],
  content: [],
}

const PostsNewPage: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState(initErrors)

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const response = await axios.post('/api/v1/posts', formData).catch((error: AxiosError) => {
      const {response} = error
      if (response?.status === 422) {
        setErrors(response.data.error)
      }
    })
    if (response?.data.user) {
      setErrors(initErrors)
      alert('创建成功！')
    }
  }, [formData])

  return (
    <>
      <h2>写文章</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>标题</span>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })}
            />
          </label>
          <span>{errors.title[0]}</span>
        </div>
        <div>
          <label>
            <span>内容</span>
            <textarea
              value={formData.content}
              onChange={e => setFormData({
                ...formData,
                content: e.target.value
              })}
            />
          </label>
          <span>{errors.content[0]}</span>
        </div>
        <div>
          <button type="submit">提交</button>
        </div>
      </form>
    </>
  )
}

export default PostsNewPage;