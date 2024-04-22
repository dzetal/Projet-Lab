// import styled from "styled-components";
import React from "react";
import {auth, provider} from '../firebaseConfig';
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuth}) => {
 
    let navigate = useNavigate();

    const signInWithGoogle = ()=> {
      signInWithPopup(auth, provider).then((result) =>{
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate('/Admin');
      });
    };

    const handleClick = () => {
      navigate('/');
    };

    return ( 
        <div>
        <h1> Sign In with google </h1>
        <button onClick={signInWithGoogle}> Sign in with Google</button>
        <button onClick={handleClick}> Click here for navigate to the webdoc </button>
        </div>
     );
}
 
export default Login;