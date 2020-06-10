import React from 'react'
import './Header.sass'

export const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header__headlines">
                <h1>To Do on TS!</h1>
                <div className="header__stats">
                    <span>3</span> more to do, <span>0</span> done
                </div>
            </div>
        </div>
    )
}
