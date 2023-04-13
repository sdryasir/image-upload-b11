import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {useGetAllTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation} from '../features/todo/todoSlice'
import ReactPaginate from 'react-paginate';
function TodoList() {


    const [sort, setSort] = useState({sort:"title", order:"desc"})
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("");
    let url = `todos?sort=${sort}&page=${page}&search=${search}`
    const {data, error, isLoading} = useGetAllTodosQuery(url)
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    // const dispatch = useDispatch()

    


    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const handleUpdate = async (t) => {
        try {
            await updateTodo(t)
        } catch (error) {
            console.log(error)
        }
        
    }
   
    const handleSearch = (e)=>{
        e.preventDefault();
    }

    const handlePageChange = (e) => {
        setPage(e.selected + 1);
      };
    
    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h3>{error.error}</h3>

    return (
        <div className=' mt-5'><ul className="list-group">
            <form onSubmit={handleSearch} id='form'>
                <div className="mb-3 mt-5">
                    <input type="text" onChange={(e)=>setSearch(e.target.value)} className="form-control" placeholder='Enter the title' />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <li className="list-group-item">All Todos</li>
            {
                data.todos.length === 0 ? <li className="list-group-item fs-6">
                    No todos Found...
                </li>
                    :
                    data.todos.map((todo, idx) => {
                        return (
                            <li  key= {idx} className="list-group-item d-flex justify-content-between">
                                <span>{todo?.title}</span>
                                <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(todo?._id)}></i>
                                <Link to={`/edit/${todo._id}`}><i className="bi bi-pencil" style={{ cursor: 'pointer' }}></i></Link>                                </li>
                        )
                    })
                    

            }
            <ReactPaginate
                  breakLabel={"..."} // break Label
                  nextLabel={"next"} // Next Page Button & label
                  previousLabel={"previous"} // Previous Page Button & label
                  pageCount={data.pageCount} // Sets Page Counts
                  marginPagesDisplayed={1} // Sets Ending pages range
                  pageRangeDisplayed={5} // Sets Starting pages range
                  onPageChange={(e) => handlePageChange(e)}

                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  activeClassName="active"
                />


            
             
             
        </ul>
        
        </div>
        
    )
}

export default TodoList