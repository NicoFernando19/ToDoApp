import React from 'react';
import TaskCard from '../TaskCard.tsx';

import { useQuery } from 'react-query';

import { getTodos } from '../../api/getTodos/index';

const TaskList: React.FC = () => {
    const { isLoading, isError, error, data } = useQuery('todos', getTodos)
    const completeds = data?.todos.filter((a) => a.status === 'completed') || []
    const uncompleteds = data?.todos.filter(a => a.status === 'uncompleted') || []
    completeds?.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
    uncompleteds?.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1)
    const sorted = [...uncompleteds, ...completeds]

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
            {sorted?.map((todo) => {
                return(
                    <TaskCard key={todo._id} taskId={todo._id} title={todo.title} status={todo.status}  />
                )
            })}
        </section>
    )
}

export default TaskList