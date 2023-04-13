import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const {token} = useSelector(state => state.auth)
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const logOut = async ()=>{
    try {
      await logout();
      localStorage.removeItem("persist:root");
      navigate('/auth/login')
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='container'>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex align-items-center">
          <Link to='/' className="navbar-brand">Todo App</Link>
          <form className="d-flex">
          <Link to='/auth/register'><button type="button" className="btn btn-primary me-3">Signup</button></Link>
          {
            token ?
            <button type="button" className="btn btn-primary me-4 bg-danger" onClick={logOut}>Logout</button>:
            <Link to='/auth/login' className="btn btn-primary me-4">Login</Link>
          }
          
            {/* <a href="" className='text-dark' style={{ textDecoration: 'none' }}>{todos.length}</a> */}
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;