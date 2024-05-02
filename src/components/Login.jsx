import React, { useState, useEffect } from 'react';
import {auth, provider} from '../firebaseConfig';
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import logo from "../images/Arc.png"

const Login = () => {
 
    let navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
  
    const signIn = async () => {
      event.preventDefault();
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        setIsAuth(true); // Indique que l'utilisateur est authentifié
      } catch (error) {
        console.error(error);
      }
    };
  
    // Utilisez useEffect pour gérer la redirection basée sur l'authentification
    useEffect(() => {
      if (isAuth) {
        navigate('/Admin'); // Redirige vers /Admin si l'utilisateur est authentifié
      }
    }, [isAuth, navigate]);

    const handleClick = () => {
      navigate('/');
    };

    return ( 
        <div>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>

<form style={{width: '50%', padding:'5%', fontFamily:'MaPolice sans-serif',}}>
<div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}> 
<Link to="/"> <img className="mb-4" src={logo} alt="" width="100" height="120"/> </Link>
</div>

<div className="form-floating">
<input style={{width:'100%', marginBottom:'20px', marginTop:'80px'}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
<label htmlFor="email">Email:</label>
</div>
<div className="form-floating">
<input style={{width:'100%', marginBottom:'20px', marginTop:'20px'}} type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
<label htmlFor="password">Mot de passe:</label>
</div>
<button style={{width:'100px'}} onClick={signIn} className="btn btn-primary w-100 py-2">Se connecter </button>
<p className="mt-5 mb-3 text-body-secondary">&copy; Oracle</p>
</form>
</div>
        </div>
     );
}
 
export default Login;