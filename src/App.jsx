import { useState, useEffect, useRef } from 'react'
import {Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import CreatePost from './components/CreatePost'
import { signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'
import styled from "styled-components";
import Admin from './components/Admin';
import MortPage from './pages/MortPage'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollingText from './components/ScrollingText'
import ScrollingReverseTexte from './components/ScrollingReverseText'
import ScrollingTextEnd from './components/ScrollingTextEnd'
import logo from "../src/images/Logo.png"
import NavigationComponent from './components/NavigationComponent'
import PremissesText from './components/PremissesText'
import MortText from './components/MortText'
import RenaissanceText from './components/RenaissanceText'
import HoverEffect1 from './components/HoverEffect1'
import Testexample from './pages/test'
import Testexample2 from './pages/test2'
import Monde from './pages/Monde'
import Monde2 from './pages/Monde2'
import Monde3 from './pages/monde3'


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

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
      {location.pathname === '/' && ( 
      <div>
        <NavigationComponent/>
        

      </div>
)}


    
      <Routes>
        
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/Admin' element={<Admin isAuth={isAuth}/>}></Route>
        <Route path='/Mort' element={<MortPage isAuth={isAuth}/>}></Route>
        <Route path='/Navigation' element={<NavigationComponent />}></Route>
        <Route path='/PremissesText' element={<PremissesText/>}></Route>
        <Route path='/test' element={<Testexample/>}></Route>
        <Route path='/test2' element={<Testexample2/>}></Route>
        <Route path='/monde' element={<Monde/>}></Route>
        <Route path='/monde2' element={<Monde2/>}></Route>
        <Route path='/monde3' element={<Monde3/>}></Route>
        <Route path='/HoverEffect1' element={<HoverEffect1/>}></Route>
        <Route path='/MortText' element={<MortText isAuth={isAuth}/>}></Route>
        <Route path='/RenaissanceText' element={<RenaissanceText isAuth={isAuth}/>}></Route>
        <Route path='/ScrollText' element={<ScrollingText isAuth={isAuth}/>}></Route>
        <Route path='/ScrollTextEnd' element={<ScrollingTextEnd isAuth={isAuth}/>}></Route>
        <Route path='/ScrollTextReverse' element={<ScrollingReverseTexte isAuth={isAuth}/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/CreatePost' element={<CreatePost/>}></Route>
        <Route path="/CreatePost/:postId?" element={<CreatePost isAuth={isAuth} />} />
        
      </Routes>
  </>
  )

}



export default App
