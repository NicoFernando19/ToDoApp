import React from 'react';
import TaskCard from '../TaskCard.tsx';

import { useQuery } from 'react-query';

import { getTodos } from '../../api/getTodos/index';

const TaskList: React.FC = () => {
    const { isLoading, isError, error, data } = useQuery('todos', getTodos)

    if (isLoading) {
        return (
            <div>Is Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Is Error...</div>
        )
    }

    return (
        <section className='flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded'>

            {data?.todos.map((todo) => {
                return(
                    <TaskCard key={todo._id} title={todo.title} />
                )
            })}
        </section>
    )
}

export default TaskList