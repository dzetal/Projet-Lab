import { useState } from 'react'
import {Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import CreatePost from './components/CreatePost'
import { signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'
import styled from "styled-components";
import Admin from './components/Admin'
function App() {

  const [isAuth, setIsAuth]= useState(localStorage.getItem("isAuth"));
  const location = useLocation();
  const signUserOut = () => {
    signOut(auth).then(()=>{
      localStorage.clear();
        setIsAuth(false);
        window.location.pathname='/Login'
      
    });
  };

  return (
  <>
      {location.pathname === '/' && ( <Navabar>

        <Logo>
         <p>Logo</p>
        </Logo>

        <MenuStyle> 
        {!isAuth && <Link to="/">Home</Link>}

       {!isAuth ? (
       <Link to={'/Login'}> Login </Link>
       ) :(
        <> 
        <Link to={'/CreatePost'}> create </Link>
        <Link to={'/Admin'}> Admin dashboard </Link>
        <LogOutButton onClick={signUserOut}> Log out </LogOutButton> 
        </>
        )}

        </MenuStyle>
        </Navabar> )}

      <Routes>
        
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/Admin' element={<Admin isAuth={isAuth}/>}></Route>
        <Route path='/Login' element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path='/CreatePost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path="/CreatePost/:postId?" element={<CreatePost isAuth={isAuth} />} />
        
      </Routes>
  </>
  )

}

const Navabar= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
border: solid 2px black;
height: 30rem;
`

const Logo= styled.div`

width: 50px;
height: 50px;
border-radius: 50%;
border: solid 2px black;
`

const MenuStyle= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
width: 75%;
`

const LogOutButton= styled.div`

width: 100px;
height: 20px;
border: 2px solid black;
display: block;
`

export default App
