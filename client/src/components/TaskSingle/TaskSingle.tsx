import React from 'react'
import './TaskSingle.sass'

// Interfaces
import { TaskSinglePropsModel } from './TaskSingle.model'

export const TaskSingle: React.FC<TaskSinglePropsModel> = ({
    task,
    onMarkAsImportant,
    onMarkAsDone,
    onDeleteTodo,
}) => {
    const baseClassName = 'tasksingle__elem'

    const importantClassName = task.important ? ' important' : ''
    const doneClassName = task.done ? ' done' : ''
    const resultedClassName = baseClassName + importantClassName + doneClassName

    return (
        <div className="tasksingle">
            <div className={resultedClassName}>
                <div className="tasksingle__text">{task.text}</div>
                <div className="tasksingle__btns">
                    <div
                        className="tasksingle__trash-btn tasksingle__btn-single"
                        onClick={() => onDeleteTodo(task.id)}
                    >
                        <i className="fa fa-trash"></i>
                    </div>
                    <div
                        className="tasksingle__exclamination-btn tasksingle__btn-single"
                        onClick={() => onMarkAsImportant(task.id)}
                    >
                        <i className="fa fa-exclamation"></i>
                    </div>
                    <div
                        className="tasksingle__done-btn tasksingle__btn-single"
                        onClick={() => onMarkAsDone(task.id)}
                    >
                        <i className="fa fa-check"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
