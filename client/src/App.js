import React, { useState, useEffect } from 'react'

import Loader from 'react-loader-spinner'

// Custom components
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { TaskBar } from './components/TaskBar/TaskBar'
import { Footer } from './components/Footer/Footer'
import { Error } from './components/Error/Error'

// Pages
import { AuthPage } from './pages/Auth.page.js'

// Hooks
import { useHttp } from './hooks/http.hook'

// Context
import { AuthContext } from './Auth.context'
import { useAuth } from './hooks/auth.hook'

const App = () => {
    const { token, userId, login, logout, ready } = useAuth()

    const [filters, setFilters] = useState('all')
    const [error, setError] = useState('')
    const [auth, setAuth] = useState(false)
    const [searchWord, setSearchWord] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    const { request } = useHttp()

    useEffect(() => {
        const loadData = async () => {
            const UD = await JSON.parse(localStorage.getItem('userData'))
            if (UD && UD.token !== null) {
                await loadTasks()
            }
        }
        loadData()
        console.log('Load')
    }, [auth])

    const setNewFilters = (mode) => {
        setFilters(mode)
    }

    const onSearchWordChange = (word) => {
        setSearchWord(word)
    }

    const loadTasks = async () => {
        setLoading(true)
        const data = await request('/api/tasks/loadtask', 'POST', {
            userData: localStorage.getItem('userData'),
        })
        //console.log('data', data.candidateTasks)
        setTodos(data.candidateTasks)
        setLoading(false)
    }

    const addNewTaskHandler = async (text) => {
        const todosClone = todos.concat()
        const newElement = {
            text: text,
            important: false,
            done: false,
        }
        const res = await request('/api/tasks/addtask', 'POST', {
            userData: localStorage.getItem('userData'),
            text: newElement.text,
        })
        console.log('res', res)
        todosClone.push(res)
        setTodos(todosClone)
    }

    const markAsImportant = (id) => {
        const todosClone = todos.concat()
        const findRes = todosClone.find((e) => e.id === id)
        if (findRes) {
            todosClone[id].important = !todosClone[id].important
        }
        setTodos(todosClone)
    }

    const markAsDone = (id) => {
        const todosClone = todos.concat()
        const findRes = todos.find((e) => e.id === id)
        if (findRes) {
            todosClone[id].done = !todosClone[id].done
        }
        setTodos(todosClone)
    }

    const setath = (bool) => {
        setAuth(bool)
    }

    const deleteTodo = async (id) => {
        console.log(localStorage.getItem('userData'))
        const res = await request(`/api/tasks/removetask/${id}`, 'POST', {
            userData: localStorage.getItem('userData'),
        })
        console.log(res)
        setTodos(res)
    }

    useEffect(() => {
        if (filters === 'all') {
            const todosClone = todos.concat()
            setFilteredData(todosClone)
        }
        if (filters === 'done') {
            const todosClone = todos.concat()
            const res = todosClone.filter((el) => el.done === true)
            setFilteredData(res)
        }
        if (filters === 'important') {
            const todosClone = todos.concat()
            const res = todosClone.filter((el) => el.important === true)
            setFilteredData(res)
        }
        if (searchWord !== '') {
            const todosClone = todos.concat()
            const tempArr = []
            todosClone.map((el) => {
                if (el.text.toLowerCase().includes(searchWord.toLowerCase())) {
                    tempArr.push(el)
                }
            })
            setFilteredData(tempArr)
        }
    }, [filters, todos, searchWord])

    const content = (
        <>
            <Header />
            <SearchBar
                onSetFilters={setNewFilters}
                onSearchWordChange={onSearchWordChange}
            />
            <TaskBar
                todos={filteredData}
                onAddNewElem={addNewTaskHandler}
                onMarkAsImportant={markAsImportant}
                onMarkAsDone={markAsDone}
                onDeleteTodo={deleteTodo}
            />
            <Footer />
        </>
    )

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                login,
                logout,
                ready,
                auth,
            }}
        >
            <div className="App">
                {!token && <AuthPage onSetAuth={setath} />}
                {loading && token && (
                    <Loader
                        className="spinner"
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={30000} //3 secs
                    />
                )}
                {token && content}
            </div>
            {error !== '' && <Error error={error} />}
        </AuthContext.Provider>
    )
}

export default App
