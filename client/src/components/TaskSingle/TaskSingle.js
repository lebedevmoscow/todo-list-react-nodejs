import React from 'react'
import './TaskSingle.sass'

export const TaskSingle = ({
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
                        onClick={() => onDeleteTodo(task._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </div>
                    <div
                        className="tasksingle__exclamination-btn tasksingle__btn-single"
                        onClick={() => onMarkAsImportant(task._id)}
                    >
                        <i className="fa fa-exclamation"></i>
                    </div>
                    <div
                        className="tasksingle__done-btn tasksingle__btn-single"
                        onClick={() => onMarkAsDone(task._id)}
                    >
                        <i className="fa fa-check"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
