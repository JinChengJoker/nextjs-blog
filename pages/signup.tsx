import {NextPage} from "next";
import {FormEvent, useCallback, useState} from "react";
import axios, {AxiosError} from "axios";

const SignupPage: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordRepeat: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordRepeat: [],
  })

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    await axios.post('/api/v1/users').catch((error: AxiosError) => {
      console.log('--------------')
      console.dir(error)
      console.log('--------------')
      const {response} = error
    })
  }, [formData])

  return (
    <>
      <h2>注册</h2>
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
          <label>
            <span>确认密码</span>
            <input
              type="password"
              value={formData.passwordRepeat}
              onChange={e => setFormData({
                ...formData,
                passwordRepeat: e.target.value
              })}
            />
          </label>
          <span>{errors.passwordRepeat[0]}</span>
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  )
}

export default SignupPage