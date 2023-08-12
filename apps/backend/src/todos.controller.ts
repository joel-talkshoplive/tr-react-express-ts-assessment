import {Todo} from "./todo.model";

export let todos = [
    {
        id: 1,
        todo: "Take Teddy for a walk",
        completed: false,
    },
];

export class TodosController {
    currentId: number = 1;
    get(id: number): Todo | null {
        let result = todos.filter(value => value.id == id);
        if(result && result.length>=1) {
            return result[0];
        }
        return null;
    }

    create(todo: Todo): Todo | null {
        if(todo) {
            todo.id = this.getNextId();
            todos.push(todo);
            return todo;
        }
        return null;
    }

    update(id: number, todo: Todo): Todo | null {
        let result = this.get(id);
        if(result) {
            result.todo = todo.todo;
            result.completed = todo.completed;
            return result;
        }
        return null;
    }

    delete(id: number): boolean {
        const response = this.get(id);
        if(response) {
            todos = todos.filter(value => value.id !== id);
            return true;
        }
        return false;
    }

    private getNextId(): number {
        if((todos.length==1 && todos[0].id>=this.currentId)) {
            this.currentId++;
        } else if(todos.length > 1) {
            this.currentId = todos[todos.length-1].id + 1;
        }
        return this.currentId;
    }
}
