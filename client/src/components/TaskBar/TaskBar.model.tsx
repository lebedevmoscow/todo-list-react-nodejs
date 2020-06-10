export interface TaskBarPropsModel {
    todos: { id: number; text: string; important: boolean; done: boolean }[]
    onAddNewElem: (text: string) => void
    onMarkAsImportant: (id: number) => void
    onMarkAsDone: (id: number) => void
    onDeleteTodo: (id: number) => void
}
