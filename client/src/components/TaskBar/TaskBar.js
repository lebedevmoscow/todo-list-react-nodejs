import React, { useState, ChangeEvent } from 'react'
import './TaskBar.sass'

// Custom components
import { TaskSingle } from './../TaskSingle/TaskSingle'

export const TaskBar = ({
    todos,
    onAddNewElem,
    onMarkAsImportant,
    onMarkAsDone,
    onDeleteTodo,
}) => {
    const [inputValue, setInputValue] = useState('')

    // Updating local state on every changing input
    const inputHandler = (e) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }

    // Handling Enter pressing
    const keyPressHandler = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            e.preventDefault()
            onAddNewElem(inputValue)
            setInputValue('')
        }
    }

    // Add new task to global state which contains in App.tsx
    const addTaskHandler = () => {
        onAddNewElem(inputValue)
        setInputValue('')
    }

    return (
        <div className="taskbar">
            {todos.map((task, index) => {
                return (
                    <TaskSingle
                        task={task}
                        key={index}
                        onMarkAsImportant={onMarkAsImportant}
                        onMarkAsDone={onMarkAsDone}
                        onDeleteTodo={onDeleteTodo}
                    />
                )
            })}
            <div className="taskbar__addtask">
                <form>
                    <input
                        type="text"
                        placeholder="type name of new task"
                        value={inputValue}
                        onKeyPress={keyPressHandler}
                        onChange={inputHandler}
                    ></input>
                </form>
                <div
                    className="taskbar__addtask-btn tst"
                    onClick={addTaskHandler}
                >
                    Add task
                </div>
            </div>
        </div>
    )
}
