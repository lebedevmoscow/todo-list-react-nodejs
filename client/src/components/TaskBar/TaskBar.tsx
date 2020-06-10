import React, { useEffect, useState, ChangeEvent } from 'react'
import './TaskBar.sass'

// Custom components
import { TaskSingle } from './../TaskSingle/TaskSingle'

// Interfaces
import { TaskBarPropsModel } from './TaskBar.model'

export const TaskBar: React.FC<TaskBarPropsModel> = ({
    todos,
    onAddNewElem,
    onMarkAsImportant,
    onMarkAsDone,
    onDeleteTodo,
}) => {
    const [inputValue, setInputValue] = useState('')

    // Updating local state on every changing input
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }

    // Handling Enter pressing
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                <div className="taskbar__addtask-btn" onClick={addTaskHandler}>
                    Add task
                </div>
            </div>
        </div>
    )
}
