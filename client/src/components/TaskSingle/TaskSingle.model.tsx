export interface TaskSinglePropsModel {
    task: { id: number; text: string; important: boolean; done: boolean }
    onMarkAsImportant: (id: number) => void
    onMarkAsDone: (id: number) => void
    onDeleteTodo: (id: number) => void
}
