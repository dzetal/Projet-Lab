import styled, { keyframes } from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import image1 from "../images/hover1.jpg"
import image2 from "../images/hover2.jpg"
import image3 from "../images/hover3.jpg"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import HoverEffect1 from "./HoverEffect1";
import HoverEffect2 from "./HoverEffect2";
import HoverEffect3 from "./HoverEffect3";
import MortPage from "../pages/MortPage";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const Home = ({isAuth}) => {
   const [postLists, setPostLists] = useState([]);

   const postsCollectionRef = collection(db, "posts")
   let navigate = useNavigate();

   useEffect (() =>{
    const getPosts= async () =>{
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getPosts();
   },[])


   const renderMediaPreview = (videoURL) => {
    if (videoURL.includes("youtube.com")) {
      const videoId = videoURL.split("v=")[1];
      return (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <p>Media Preview Not Available</p>;
    }
  };


    return ( 
        <div className="HomeContainer" style={{background:'#292929', color:'white'}}> 

        <FirstPostContainer>
          <HoverEffect1
          src={image1}
          width={1366}
          height={805}/>
          <HoverEffect2
          src={image2}
          width={1366}
          height={805}/>
          <HoverEffect3
          src={image3}
          width={1366}
          height={805}/>
        </FirstPostContainer>

        <SecondPostContainer>
          <MortPage/>
        </SecondPostContainer>
        </div>
     );
}


const FirstPostContainer= styled.div`
position: relative;
bottom: 10px;
display: flex;
flex-direction: row;
justify-content: space-between;
z-index: 1;

`

const SecondPostContainer= styled.div`
margin-top: 50px;
padding:2%;
`

 
export default Home;