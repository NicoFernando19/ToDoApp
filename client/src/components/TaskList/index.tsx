import React from 'react';
import TaskCard from '../TaskCard.tsx';

const TaskList: React.FC = () => {
    return (
        <section className='flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded'>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
            <TaskCard title='Todo'/>
        </section>
    )
}

export default TaskList