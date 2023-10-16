import { Request, Response } from 'express';

import TodoModel from '../../models/todo';
import { Todo } from '../../types/todo';

export const getTodos = async (req: Request, res: Response) => {
    let cutOff = new Date()
    cutOff.setDate(cutOff.getDate() - 2)
    const todos: Todo[] = await TodoModel.find({ 
        $or: [ 
            { completedAt: { 
                    $gt: new Date(cutOff.toISOString()) 
                } 
            }, 
            { 
                completedAt: null 
            }  
            ] 
        }).exec()

    res.status(200).json({ todos })
}

export const getTodo = async (req: Request, res: Response) => {
    const {
        params: {id}
    } = req

    if (!id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: params _id is not defined`
        })

        return
    }

    await TodoModel.findById(req.params.id, (err, result) => {
        if (result == null)
        {
            res.status(400).json({
                error: 'Todo not found'
            })

            return 
        }

        res.status(200).json({ result })
    })
}

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    const body: Pick<Todo, 'title' | 'status' | 'priority'> = req.body

    if (!body.title || !body.status || !body.priority) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status: ${body.status}, priority: ${body.priority}`
        })

        return
    }

    const newTodoModel = new TodoModel({
        title: body.title,
        status: body.status,
        priority: body.priority,
        completedAt: null,
        deleted_at: ''
    })

    const newTodo = await newTodoModel.save()
    const updatedAllTodosAfterSave = await TodoModel.find()

    res.status(201).json({
        status: 201,
        message: 'Todo succesfully added!',
        addedTodo: newTodo,
        allTodosAfterAddition: updatedAllTodosAfterSave
    })
}

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const {
        params: {id},
        body,
    } = req

    if (!body.priority || !body.title || !body.status || !id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: id or required body properties is not defined`
        })

        return
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body)
    const updatedAllTodosAfterUpdate = await TodoModel.find()

    if (!updatedTodo) 
    {
        res.status(501).json({
            status: 501,
            errorMessage: 'Edit todo failed. Not implemented'
        })

        return
    }

    res.status(200).json({
        message: 'Todo successfully updated',
        updatedTodo,
        todos: updatedAllTodosAfterUpdate
    })
}

export const softDelete = async (req: Request, res: Response): Promise<void> => {
    const {
        params: {id}
    } = req

    if (!id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: params _id is not defined`
        })

        return 
    }

    const softDel = await TodoModel.findByIdAndUpdate({ _id: id }, { deleted_at: Date.now() })

    if (!softDel) 
    {
        res.status(501).json({
            status: 501,
            errorMessage: 'Edit todo failed. Not implemented'
        })

        return
    }

    res.status(200).json({
        message: 'Todo successfully updated'
    })    
}

export const deleteTodo =async (req: Request, res: Response): Promise<void> => {
    const {
        params: {id}
    } = req

    if (!id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: params _id is not defined`
        })

        return
    }

    const removeTodo = await TodoModel.findByIdAndRemove(id)
    const updatedAllTodosAfterRemove = await TodoModel.find()

    if (!removeTodo)
    {
        res.status(501).json({
            status: 501,
            errorMessage: 'Edit todo failed. Not implemented'
        })

        return
    }

    res.status(200).json({
        message: 'Todo successfully removed',
        removeTodo,
        todos: updatedAllTodosAfterRemove
    })

    // await TodoModel.findByIdAndDelete(req.params.id, (err, result) => {
    //     if (err) {
    //         res.status(400).json({
    //             error: err
    //         })
    //     }
        
    //     res.status(200).json({ result })
    // })
}