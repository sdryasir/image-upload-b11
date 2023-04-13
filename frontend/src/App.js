import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EditTodo from './components/EditTodo'
import PrivateRoutes from './components/PrivateRoutes';

function App() {
   
   
  return (
    <>
    <Router>
      <Navbar />
      <Routes>

        <Route path='/' element={<PrivateRoutes/>}>
          <Route path='/' element={ <TodoForm/>} />
          <Route path='/edit/:id' element={ <EditTodo />} />
          
        </Route>


        
        <Route path='/auth/login' element={ <Login />} />
        <Route path='/auth/register' element={ <SignUp />} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
