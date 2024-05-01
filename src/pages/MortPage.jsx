import React, { useEffect, useState, useRef} from 'react';
import { Link, Element, scroller } from 'react-scroll';
import styled, { keyframes } from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import PremissesText from '../components/PremissesText';
import MortText from '../components/MortText';
import RenaissanceText from '../components/RenaissanceText';


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);



// Composants spécifiques pour chaque article
const Article1 = () => (
  <div> 
      <PremissesText/>
      <Navbar>
  <Link to="section1" smooth={true}> PREMISSES </Link> |
  <Link to="section2" smooth={true}> MORT </Link> |
  <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
      </Navbar>
  <ContainerDiv>
  <TextDiv>
      <h1> Lorem ipsum </h1>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ipsa nihil et quidem corporis illum, reprehenderit similique id aut ullam nobis, maxime repellendus sed ipsam. Officiis, dolorum sequi. Nihil? </p>

  </TextDiv>

  <ImageDiv style={{backgroundColor:"yellow"}}>

  </ImageDiv>
  </ContainerDiv>
  </div>
);

const Article2 = () => (
  <div> 
      <MortText/>
      <Navbar>
  <Link to="section1" smooth={true}> PREMISSES </Link> |
  <Link to="section2" smooth={true}> MORT </Link> |
  <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
      </Navbar>
  <ContainerDiv>
  <TextDiv>
      <h1> Lorem ipsum </h1>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ipsa nihil et quidem corporis illum, reprehenderit similique id aut ullam nobis, maxime repellendus sed ipsam. Officiis, dolorum sequi. Nihil? </p>

  </TextDiv>

  <ImageDiv style={{backgroundColor:"red"}}>

  </ImageDiv>
  </ContainerDiv>
  </div>
);

const Article3 = () => (
  <div> 
      <MortText/>
      <Navbar>
  <Link to="section1" smooth={true}> PREMISSES </Link> |
  <Link to="section2" smooth={true}> MORT </Link> |
  <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
      </Navbar>
  <ContainerDiv>
  <TextDiv>
      <h1> Lorem ipsum </h1>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ipsa nihil et quidem corporis illum, reprehenderit similique id aut ullam nobis, maxime repellendus sed ipsam. Officiis, dolorum sequi. Nihil? </p>

  </TextDiv>

  <ImageDiv style={{backgroundColor:"blue"}}>

  </ImageDiv>
  </ContainerDiv>
  </div>
);

// Composants spécifiques pour chaque section
const Section1 = () => (
    <div> 
        <PremissesText/>
        <Navbar>
    <Link to="section1" smooth={true}> PREMISSES </Link> |
    <Link to="section2" smooth={true}> MORT </Link> |
    <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
        </Navbar>
    <ContainerDiv>
    <TextDiv>
        <h1> Lorem ipsum </h1>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ipsa nihil et quidem corporis illum, reprehenderit similique id aut ullam nobis, maxime repellendus sed ipsam. Officiis, dolorum sequi. Nihil? </p>

    </TextDiv>

    <ImageDiv style={{backgroundColor:"yellow"}}>

    </ImageDiv>
    </ContainerDiv>
    </div>
  );
  
  const Section2 = () => (
    <div> 
        <MortText/>
        <Navbar>
    <Link to="section1" smooth={true}> PREMISSES </Link> |
    <Link to="section2" smooth={true}> MORT </Link> |
    <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
        </Navbar>
    <ContainerDiv>
    <TextDiv>
        <h1> Lorem ipsum </h1>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ipsa nihil et quidem corporis illum, reprehenderit similique id aut ullam nobis, maxime repellendus sed ipsam. Officiis, dolorum sequi. Nihil? </p>

    </TextDiv>

    <ImageDiv style={{backgroundColor:"red"}}>

    </ImageDiv>
    </ContainerDiv>
    </div>
  );
  
  const SecondPostSection = ({ postLists, renderMediaPreview }) => (

  <div> 
    <RenaissanceText/>
    <Element name="secondPostContainer" >
    <Navbar>
    <Link to="section1" smooth={true}> PREMISSES </Link> |
    <Link to="section2" smooth={true}> MORT </Link> |
    <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
        </Navbar>
      <ContainerDivFlex>
        {postLists.map((post) => (
          <Post key={post.id} index={post.index}>
            <TextDiv>
              <div className="PostTitle">
                <h3>{post.title}</h3>
                <div className="DateContainer">
                  <p>{post.debutdate} - {post.enddate}</p>
                </div>
              </div>
  
              <div className="PostContent">
                <p>{post.content}</p>
              </div>
            </TextDiv>
            
            <ImageDiv>
              <img src={post.mediaURL} />
              {post.videoURL && renderMediaPreview(post.videoURL)}
            </ImageDiv>
          </Post>
        ))}
      </ContainerDivFlex>
      
    </Element>
    </div>
  );

const sections = [
    { id: 'section1', title: 'PREMISSES ', component: Section1  },
    { id: 'section2', title: 'MORT ', component: Section2  },
    { id: 'secondPostContainer', title: 'RENAISSANCE', component: SecondPostSection },
  ];

  const articles = [
    { id: 'article1', title: 'PREMISSES2 ', component: Article1  },
    { id: 'article2', title: 'MORT2 ', component: Article2  },
    { id: 'article3', title: 'RENAISSANCE2', component: Article3 },
  ];

const MortPage = () => {
    const containerRef = useRef(null);
    const timeline = useRef(null);
    const [postLists, setPostLists] = useState([]);

    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();
 
    useEffect (() =>{
     const getPosts= async () =>{
         const data = await getDocs(postsCollectionRef);
         setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
     };
 
     getPosts();

         // Chronologie GSAP pour les transitions
    timeline.current = gsap.timeline({ paused: true });
    timeline.current.to(containerRef.current, {
      x: '-100vw',
      duration: 0.5,
      ease: 'power3.easeInOut',
    });
    },[])


    const handleAboutClick = () => {
        timeline.current.play(); 
      };
    
      const handleHomeClick = () => {
        timeline.current.reverse(); 
      };

 
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

   
      // Fonction pour défiler vers un hash donné
  const scrollToHash = (hash, e) => {
    if (!hash) {
        console.error('Hash is empty');
        return;
      }
    const element = document.querySelector(hash);
    if (element) {
      if (e) e.preventDefault();
      gsap.to(window, { scrollTo: element, duration: 1 });
    }
  };

  useEffect(() => {
    // Défilement initial vers le hash de l'URL
    scrollToHash(window.location.hash);
  }, []);

    return (    
    <div style={{ overflow: 'hidden', width: '100%' }}>

<div
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '200%',
            transform: 'translateX(0)',
          }}
        >

    <section className="home" style={{ width: '50%' }}>
      {sections.map((section) => (
        <Element
          key={section.id}
          name={section.id}
          style={{
            // height: '100vw',
          }}
        >
         <NavbarIndividual>
    <Link to="about"smooth={true} onClick={handleAboutClick}> FFTA </Link>
        </NavbarIndividual>
          {React.createElement(section.component, { postLists, renderMediaPreview })}
        </Element>
      ))}
    </section>
    

    <section className="about" style={{ width: '50%' }}>
    {articles.map((article) => (
        <Element
          key={article.id}
          name={article.id}
          style={{
           marginLeft: '5%'
          }}
        >
         <NavbarIndividual2>
         <Link to="home" smooth={true} onClick={handleHomeClick}>DANS LE MONDE </Link>
        </NavbarIndividual2>
          {React.createElement(article.component)}
        </Element>
      ))}
          </section>
    </div>
    </div> );
}

const Navbar = styled.div`
  position: relative;
  width: 35%;
  border: 2px solid;
  border-radius: 35px;
  padding: 15px;
  margin-bottom: 20px;
  background: lightgray;
  display: flex;
  justify-content: space-around;
  transform: translateX(185%);
`;

const NavbarIndividual = styled.div`
position: relative;
align-items: center;
border-radius: 35px;
top: 208px;
left: 57%;
width: 20%;
padding: 15px;
border: 2px solid;
cursor: pointer;
`;

const NavbarIndividual2 = styled.div`
position: relative;
align-items: center;
border-radius: 35px;
top: 208px;
left: 50%;
width: 25%;
padding: 15px;
border: 2px solid;
cursor: pointer;
`;

 
const ContainerDiv = styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;

` 

const ContainerDivFlex = styled.div`

display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;

` 

const TextDiv = styled.div`

width: 50%;
height: 500px;
border: solid 2px;
border-radius: 15px;

`

const ImageDiv = styled.div`

width: 50%;
height: 500px;
border: solid 2px;
border-radius: 15px;

`

const Post= styled.div`

display: flex;
flex-direction:row;
align-items: center;
margin-bottom: 2rem;
`

export default MortPage;