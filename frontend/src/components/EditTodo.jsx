import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import React from 'react'
import { addTodo } from '../features/todo/todoSlice'
import TodoList from "./TodoList"
import { useNavigate } from "react-router-dom"
import {useGetTodoByIdQuery, useUpdateTodoMutation} from '../features/todo/todoSlice'
import {useParams} from 'react-router-dom'

function EditTodo() {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()
    const {id} = useParams();

    let {data, error, isLoading, isSuccess} = useGetTodoByIdQuery(id);

    const [updateTodo, {isLoading:isUpdateLoading}] = useUpdateTodoMutation()

    useEffect(()=>{
        if(isSuccess){
            setTitle(data.todo.title)
            setBody(data.todo.body)
        }
    }, [isSuccess])
    

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const newTodo = {
            title,
            id: id,
            body,
            status: false
        }

        try {
            await updateTodo(newTodo)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
     
    }



    return (
        <div className='container'>
            <form onSubmit={handleUpdate} id='form'>
                <div className="mb-3 mt-5">
                    <input type="text" onChange={handleTitleChange} value={title} className="form-control"  placeholder='Enter the title' />
                </div>
                <div className="mb-3">
                    <input type="text" onChange={handleBodyChange} value={body} className="form-control"  placeholder='Enter the body' />
                </div>

                <button type="submit" className="btn btn-primary">Update todo</button>
            </form>
            </div>
    )
}

export default EditTodo;