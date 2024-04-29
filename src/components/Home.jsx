import styled, { keyframes } from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import test1 from "../images/image1.png";
import test3 from "../images/image2.png";
import test2 from "../images/image3.png";
import after1 from "../images/after1.png";
import after2 from "../images/after2.png";
import after3 from "../images/after3.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


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

  const [isHovered, setIsHovered] = useState([false, false, false]);

  const handleMouseEnter = (index) => {
    setIsHovered((prev) => prev.map((h, i) => (i === index ? true : h)));
  };

  // Fonction pour gérer le départ de la souris d'un élément spécifique
  const handleMouseLeave = (index) => {
    setIsHovered((prev) => prev.map((h, i) => (i === index ? false : h)));
  };


    return ( 
        <div className="HomeContainer"> 

        <FirstPostContainer>


        <ContentDiv
        onMouseEnter={() => handleMouseEnter(0)} // Utilisez la fonction pour chaque élément
        onMouseLeave={() => handleMouseLeave(0)}
        >
        <BackgroundImage 
          style={{ backgroundImage: `url(${test1})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[0] ? 1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <BackgroundImage 
          style={{ backgroundImage: `url(${after1})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[0] ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        />
        <TextOverlay>
          <CenteredText
            animate={{ x: isHovered[0] ? -200 : 0, opacity: isHovered[0] ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Texte de base
          </CenteredText>

          <CenteredText
            animate={{ x: isHovered[0] ? 0 : 100, opacity: isHovered[0] ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Texte au survol
          </CenteredText>
        </TextOverlay>
        </ContentDiv>



        <ContentDiv
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave(1)}
        >
        <BackgroundImage 
          style={{ backgroundImage: `url(${test2})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[1] ? 1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <BackgroundImage 
          style={{ backgroundImage: `url(${after2})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[1] ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        />
        <TextOverlay>
          <CenteredText
            animate={{ x: isHovered[1] ? -200 : 0, opacity: isHovered[1] ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Texte de base
          </CenteredText>

          <CenteredText
            animate={{ x: isHovered[1] ? 0 : 100, opacity: isHovered[1] ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Texte au survol
          </CenteredText>
        </TextOverlay>
        </ContentDiv>



        <ContentDiv
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={() => handleMouseLeave(2)}
        >
        <BackgroundImage 
          style={{ backgroundImage: `url(${test3})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[2] ? 1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <BackgroundImage 
          style={{ backgroundImage: `url(${after3})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered[2] ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        />
        <TextOverlay>
          <CenteredText
            animate={{ x: isHovered[2] ? -200 : 0, opacity: isHovered[2] ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            Texte de base
          </CenteredText>

          <CenteredText
            animate={{ x: isHovered[2] ? 0 : 100, opacity: isHovered[2] ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Texte au survol
          </CenteredText>
        </TextOverlay>
        </ContentDiv>


        </FirstPostContainer>

        <SecondPostContainer>
          {postLists.map((post)=>{
            return (
            
            <Post key={post.id} index={post.index}> 
            <ContainerText> 
            <div className="PostTitle">
               <h3> {post.title} </h3>

            <div className="DateContainer">
               <p> {post.debutdate} - {post.enddate} </p> 
            </div> 
            </div>

            <div className="PostContent">
               <p> {post.content} </p> 
            </div>
            </ContainerText>

            <div> 
              <img src={post.mediaURL}/>
              
            </div>

            <div className="PostMediaPreview">
              {post.videoURL && renderMediaPreview(post.videoURL)}
            </div>

            </Post>
            )
          })}
        </SecondPostContainer>
        </div>
     );
}

const CenteredText = styled(motion.h1)`
  text-align: center; 
 font-size: 4rem;
 width: 100%;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 50;
  left: 50;
  width: 447px;
  height: 600px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextOverlay = styled.div`
  position: relative;
  color: white;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; 
  width: 100%;
  height: 100%;
`;


const FirstPostContainer= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;

`

const ContentDiv= styled.div`

width: 447px;
height: 600px;
position: 'relative'; 
overflow: 'hidden'; 
`


const SecondPostContainer= styled.div`

display: flex;
flex-direction: column;
border: solid 2px black;
margin-top: 50px;
padding: 5%;
`

const Post= styled.div`

display: flex;
flex-direction:row;
align-items: center;
margin-bottom: 2rem;
border: 1px solid #ddd;
`

const ContainerText= styled.div`

display: flex;
flex-direction: column;
justify-content: space-between;
border: solid 2px yellow;
margin-top: 25px;
`
 
export default Home;