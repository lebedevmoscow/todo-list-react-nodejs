import React, { useContext } from 'react'
import './Header.sass'
import { AuthContext } from './../../Auth.context'

export const Header = () => {
    const auth = useContext(AuthContext)

    return (
        <div className="header">
            <div className="header__userinfo">
                <h1>User: Lebedev</h1>
                <h1 className="header__logout" onClick={auth.logout}>
                    Logout
                </h1>
            </div>
            <div className="header__headlines">
                <h1>To Do on TS!</h1>
                <div className="header__stats">
                    <span>3</span> more to do, <span>0</span> done
                </div>
            </div>
        </div>
    )
}
