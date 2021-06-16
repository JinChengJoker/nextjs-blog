import {GetServerSideProps, NextPage} from "next";
import {FormEvent, useCallback, useState} from "react";
import axios, {AxiosError} from "axios";
import {User} from "../src/entity/User";
import {ironSession} from "lib/ironSession";

const initErrors = {
  username: [],
  password: [],
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = ironSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('user')
  return {
    props: {
      user
    }
  }
})

const SignInPage: NextPage<{user: User}> = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState(initErrors)
  const [user, setUser] = useState<User>(props.user)

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const response = await axios.post('/api/v1/sessions', formData).catch((error: AxiosError) => {
      const {response} = error
      if (response?.status === 422) {
        setErrors(response.data.error)
      }
    })
    if (response?.data.user) {
      setErrors(initErrors)
      setUser(response.data.user)
      alert('登录成功！')
    }
  }, [formData])

  return (
    <>
      {user && <div>当前用户：{user.username}</div>}
      <h2>登录</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>用户名</span>
            <input
              type="text"
              value={formData.username}
              onChange={e => setFormData({
                ...formData,
                username: e.target.value
              })}
            />
          </label>
          <span>{errors.username[0]}</span>
        </div>
        <div>
          <label>
            <span>密码</span>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })}
            />
          </label>
          <span>{errors.password[0]}</span>
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  )
}

export default SignInPage;