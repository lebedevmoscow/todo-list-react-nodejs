import React, { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(
        async (url, method = 'GET', body, headers = {}) => {
            try {
                setLoading(true)
                if (body) {
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }
                const res = await fetch(url, { method, body, headers })
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(
                        data.message || data || 'Something went wrong'
                    )
                }

                setLoading(false)
                return data
            } catch (e) {
                setLoading(false)
                setError(e.message || e)
                throw e
            }
        },
        []
    )
    const clearError = useCallback(() => setError(null), [])
    return { loading, request, error, clearError }
}
