import React from 'react'
import './SearchBar.sass'

export const SearchBar = ({ onSetFilters, onSearchWordChange }) => {
    const inputHandler = (e) => {
        onSearchWordChange(e.currentTarget.value)
    }

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="type to search"
                onChange={inputHandler}
            />
            <div className="searchbar__btns">
                <button
                    className="common-btn"
                    id="allbtn"
                    onClick={() => onSetFilters('all')}
                >
                    All
                </button>
                <button
                    className="common-btn"
                    id="activebtn"
                    onClick={() => onSetFilters('active')}
                >
                    Active
                </button>
                <button
                    className="common-btn"
                    id="donebtn"
                    onClick={() => onSetFilters('done')}
                >
                    Done
                </button>
            </div>
        </div>
    )
}
