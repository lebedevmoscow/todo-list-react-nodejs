import React, { useContext, useState, useEffect } from 'react'
import './Header.sass'
import { AuthContext } from './../../Auth.context'

export const Header = ({ todos }) => {
    const auth = useContext(AuthContext)
    const [done, setDone] = useState(0)
    const [all, setAll] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDone(0)
        setAll(0)
        computateStatistic()
    }, [todos])

    const userName = JSON.parse(localStorage.getItem('userData')).login

    const computateStatistic = () => {
        todos.forEach((element) => {
            console.log('element', element)
            if (element.done) setDone((prevState) => prevState + 1)
            setDone((prevState) => prevState + 1)
        })
    }

    return (
        <div className="header">
            <div className="header__userinfo">
                <h1>User: {userName}</h1>
                <h1 className="header__logout" onClick={auth.logout}>
                    Logout
                </h1>
            </div>
            <div className="header__headlines">
                <h1>To Do on TS!</h1>
                <div className="header__stats">
                    <span>{done}</span> more to do, <span>{done}</span> done
                </div>
            </div>
        </div>
    )
}
