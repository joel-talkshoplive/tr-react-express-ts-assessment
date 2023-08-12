export interface TodoInterface {
    id: number;
    todo: string;
    completed: boolean;
}

export interface TodoProps {
    todo: TodoInterface;
    toggleTodoStatus: (id: number) => void;
    deleteTodo: (id: number) => void;
}