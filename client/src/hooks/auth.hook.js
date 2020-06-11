import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id, login) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
                login,
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        console.log('data', data)
        if (data && data.token) {
            login(data.token, data.userId, data.login)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}
