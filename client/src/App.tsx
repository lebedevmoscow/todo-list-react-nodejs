import React, { useState, useEffect } from 'react'

// Custom components
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { TaskBar } from './components/TaskBar/TaskBar'
import { Footer } from './components/Footer/Footer'

// Models
import { AppBaseState } from './App.model'

const App: React.FC = () => {
    const [filters, setFilters] = useState<string>('all')
    const [searchWord, setSearchWord] = useState('')
    const [filteredData, setFilteredData] = useState<AppBaseState[]>([])
    const [maxId, setMaxId] = useState<number>(3)
    const [todos, setTodos] = useState<AppBaseState[]>([
        { id: 0, text: 'Drink Coffee', important: false, done: false },
        { id: 1, text: 'Learn Typescript', important: false, done: false },
        { id: 2, text: 'Make Awesome App', important: false, done: false },
    ])

    useEffect(() => {
        let data: AppBaseState[] = []
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
            const tempArr: AppBaseState[] = []
            todosClone.map((el) => {
                if (el.text.toLowerCase().includes(searchWord.toLowerCase())) {
                    tempArr.push(el)
                }
            })
            setFilteredData(tempArr)
        }
    }, [filters, todos, searchWord])

    const setNewFilters = (mode: string) => {
        setFilters(mode)
    }

    const onSearchWordChange = (word: string) => {
        setSearchWord(word)
    }

    // Add new task to the common state
    const addNewTaskHandler = (text: string) => {
        const todosClone = todos.concat()
        setMaxId((id) => id + 1)
        const newElement = {
            id: maxId - 1,
            text: text,
            important: false,
            done: false,
        }
        todosClone.push(newElement)
        setTodos(todosClone)
    }

    const markAsImportant = (id: number) => {
        const todosClone = todos.concat()
        const findRes = todosClone.find((e) => e.id === id)
        if (findRes) {
            todosClone[id].important = !todosClone[id].important
        }
        setTodos(todosClone)
    }

    const markAsDone = (id: number) => {
        const todosClone = todos.concat()
        const findRes = todos.find((e) => e.id === id)
        if (findRes) {
            todosClone[id].done = !todosClone[id].done
        }
        setTodos(todosClone)
    }

    const deleteTodo = (id: number) => {
        const todosClone = todos.concat()
        const findRes = todos.find((e) => e.id === id)
        let res: AppBaseState[] = []

        if (findRes) {
            res = todos.filter((e) => e.id !== id)
        }
        console.log(res)
        setTodos(res)
    }

    return (
        <div className="App">
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
        </div>
    )
}

export default App
