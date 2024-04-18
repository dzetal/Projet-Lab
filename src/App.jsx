import { useState } from 'react'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import CreatePost from './components/CreatePost'
import { signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'
function App() {

  const [isAuth, setIsAuth]= useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(()=>{
      localStorage.clear();
        setIsAuth(false);
        window.location.pathname='/Login'
      
    });
  };

  return (
  <>
      <nav>
        <Link to={'/'}> Home </Link>

       {!isAuth ? (
       <Link to={'/Login'}> Login </Link>
       ) :(
        <> 
        <Link to={'/CreatePost'}> create </Link>
        <button onClick={signUserOut}> Log out </button> 
        </>
        )}
        </nav>

      <Routes>
        
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/Login' element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path='/CreatePost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path="/CreatePost/:postId?" element={<CreatePost isAuth={isAuth} />} />
        
      </Routes>
  </>
  )
}

export default App
