import axios from 'axios';

import { getTodo } from '../getTodo';

import { TodoBody } from '../../types/todos.type';
import { TodoStatus } from '../../enums/todos.enums';

export const updateTodo = async (id:string): Promise<void> => {
    try {
        
        const getTodoRes = await getTodo(id)

        if (getTodoRes.status === 200) {
            const todo = getTodoRes.data.result
            const body: TodoBody = {
                title: todo.title,
                priority: 'Medium'
            }

            todo.status === TodoStatus.completed ? 
                body.status = 'uncompleted' : 
                body.status = 'completed'

            todo.status === TodoStatus.completed ?
                body.completedAt = null : 
                body.completedAt = new Date()

            await axios({
                method: 'PUT',
                url: `http://localhost:8080/api/update-todo/${id}`,
                data: body
            })
        }

    } catch (error: any) {
        throw new Error(error)
    }
}