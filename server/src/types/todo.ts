import { Document } from 'mongoose';

export interface Todo extends Document {
    title: string
    status: 'completed' | 'uncompleted'
    priority: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low'
    deleted_at: Date
}