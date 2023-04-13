import { useState } from "react"
import { useDispatch } from "react-redux"
import React from 'react'
import { addTodo } from '../features/todo/todoSlice'
import TodoList from "./TodoList"
import {useAddTodoMutation} from '../features/todo/todoSlice'

function TodoForm() {

    const [AddTodo, {isLoading}] = useAddTodoMutation();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const dispatch = useDispatch()

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTodo = {
            id: Date.now(),
            body,
            title,
            status: false

        }
            
        try {
            await AddTodo(newTodo).unwrap()
            
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='container'>
            <form onSubmit={handleSubmit} id='form'>
                <div className="mb-3 mt-5">
                    <input type="text" onChange={handleTitleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter the title' />
                </div>
                <div className="mb-3">
                    <input type="text" onChange={handleBodyChange} className="form-control" id="exampleInputPassword1" placeholder='Enter the body' />
                </div>

                <button type="submit" className="btn btn-primary">Save todo</button>
            </form>
            <TodoList />
            </div>
    )
}

export default TodoForm;