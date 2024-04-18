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
        navigate('/');
      });
    };

    return ( 
        <div>
        <h1> Sign In with google </h1>
        <button onClick={signInWithGoogle}> Sin in with Google</button>
        </div>
     );
}
 
export default Login;