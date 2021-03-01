import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    handleLogin,
    handlePasswordChange,
    handleUsernameChange }) => (

    <form onSubmit={handleLogin}>
        <div>
            username
            <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            password
            <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
    </form>
)

LoginForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default LoginForm