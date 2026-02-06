import {useState} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LoginButton} from './styledComponents'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const token = Cookies.get('jwt_token')
  if (token) return <Redirect to="/" />

  const onSubmit = async e => {
    e.preventDefault()

    // Required error message for all invalid cases
    if (!username || !password) {
      setError('Username or password is invalid')
      return
    }

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      props.history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
      />

      {/* Username */}
      <label htmlFor="username">USERNAME</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {/* Password */}
      <label htmlFor="password">PASSWORD</label>
      <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {/* Show Password */}
      <label htmlFor="showPassword">
        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(prev => !prev)}
        />
        Show Password
      </label>

      <LoginButton type="submit">Login</LoginButton>

      {error && <p>{error}</p>}
    </form>
  )
}

export default withRouter(Login)
