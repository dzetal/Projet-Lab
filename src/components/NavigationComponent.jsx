import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import styled from "styled-components";
import { useState, useEffect, useRef } from 'react'
import {Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom'
import logo from "../images/Logo.png"
import VideoIntro from "../Videos/videoInto.mp4"
import ScrollingText from './ScrollingText'
import ScrollingReverseTexte from './ScrollingReverseText'
import ScrollingTextEnd from './ScrollingTextEnd'

const NavigationComponent = () => {
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

      
        <Navbar> 

        <BackgroundVideo style={{backgroundColor:'#292929', opacity:'0.95'}} autoPlay muted loop>
         <source src={VideoIntro} type="video/mp4" />
        </BackgroundVideo>
        <NavContainer>

        <MenuStyle> 
        <MyLogo style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain',}}>
        </MyLogo>
       {!isAuth ? (
        <>
        <Link to={'/Login'} style={{color:'white', textDecoration:'none', fontSize:'1.2rem',  fontFamily:'MaPolice sans-serif',}}> Admin </Link>
        </>

       ) :(
        <> 
        <Link to={'/CreatePost'}> create </Link>
        <Link to={'/Admin'}> Admin dashboard </Link>
        <LogOutButton onClick={signUserOut}> Log out </LogOutButton> 
        </>
        )}

        </MenuStyle>

        </NavContainer>

        <Myheader>

         <ScrollingText/>
         <ScrollingReverseTexte/>
         <ScrollingTextEnd/>

</Myheader>


</Navbar>
        
    );
}

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50;
  left: 50;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: -1; 
`;

const NavContainer= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
font-family:'MaPolice' sans-serif;

`
const MyLogo= styled.div`
width: 200px;
height: 80px;
`

const MenuStyle= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding: 10px;
font-family:'MaPolice' sans-serif;
`
const LogOutButton= styled.div`

width: 100px;
height: 20px;
border: 2px solid black;
display: block;
font-family:'MaPolice' sans-serif;
`

const Navbar= styled.div`

display: flex;
flex-direction: column;
position: relative;
font-family:'MaPolice' sans-serif;
`

const Myheader= styled.div`

display: flex;
flex-direction: column;
justify-content: center;
height: 35rem;
font-family:'MaPolice' sans-serif;
`
 
export default NavigationComponent;