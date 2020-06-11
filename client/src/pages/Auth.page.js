import React, { FC, useState, useContext } from 'react'
import { useHttp } from './../hooks/http.hook.js'
import { AuthContext } from './../Auth.context'
import './Auth.page.sass'

export const AuthPage = ({ onSetAuth }) => {
    const auth = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { loading, request, error, clearError } = useHttp()

    const buttonHandler = async (type) => {
        try {
            if (login === '' || email === '' || password === '') {
                return window.M.toast({ html: 'You must fill all fields!' })
            }

            const data = await request(`/api/auth/${type}`, 'POST', {
                email,
                login,
                password,
            })
            if (type !== 'login') window.M.toast({ html: data })
            if (type === 'login') {
                auth.login(data.token, data.userId, login)
            }
            console.log('data', data)
            onSetAuth(true)
        } catch (e) {
            window.M.toast({ html: e })
        }
    }

    const onChangeHandler = (ev) => {
        const field = ev.target.name.toString()

        switch (field) {
            case 'email':
                setEmail(ev.target.value)
                break
            case 'login':
                setLogin(ev.target.value)
                break
            case 'password':
                setPassword(ev.target.value)
                break
        }
    }

    return (
        <div className="authpage">
            <div className="authpage__form">
                <h1>Register or login:</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Email: "
                        name="email"
                        value={email}
                        onChange={(e) => onChangeHandler(e)}
                    ></input>
                    <input
                        type="text"
                        placeholder="Login: "
                        name="login"
                        value={login}
                        onChange={(e) => onChangeHandler(e)}
                    ></input>
                    <input
                        type="password"
                        placeholder="Passowrd: "
                        name="password"
                        value={password}
                        onChange={(e) => onChangeHandler(e)}
                    ></input>
                </form>
                <div className="authpage__btns">
                    <button onClick={() => buttonHandler('login')}>
                        Login!
                    </button>
                    <button onClick={() => buttonHandler('register')}>
                        Register!
                    </button>
                </div>
            </div>
        </div>
    )
}
