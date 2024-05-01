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
import image1 from "../images/FFTA1.png"
import image2 from "../images/FFTA2.png"
import image3 from "../images/FFTA3.png"

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
  <ImageDiv>
  <img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={image1}/>
  </ImageDiv>
  <TextDiv>
        <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 1. Fondation et essor (1899-1914) </h1>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1899 : La Fédération française de Tir à l'Arc (FFTA) est créée le 1er février à Paris, sous l'impulsion de Maurice Bouet et d'autres passionnés. Cette initiative vise à structurer et promouvoir la discipline en France.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1900 : Le tir à l'arc fait ses débuts aux Jeux Olympiques de Paris, avec des épreuves pour hommes et femmes. Cette reconnaissance internationale donne un coup de fouet à la popularité du sport.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> La FFTA organise le premier championnat national de tir à l'arc, marquant ainsi l'officialisation de la compétition en France.</p>
        <p style={{marginTop:'160px', marginLeft:'5px', textTransform:'uppercase', fontWeight:'bold', fontSize: '0.7rem', fontStyle:'italic'}}> Les années qui précèdent la Première Guerre mondiale sont marquées par une croissance constante du tir à l'arc en France. La création de nombreux clubs et associations à travers le pays témoigne de l'engouement pour cette discipline.</p>

    </TextDiv>
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

  <ImageDiv>
  <img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={image2}/>
  </ImageDiv>

  <TextDiv>
    <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 2. L'épreuve de la guerre (1914-1918) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> 1914 : La Première Guerre mondiale éclate, bouleversant tous les aspects de la vie française. De nombreux archers, comme la plupart des hommes valides, sont mobilisés sur le front. Les compétitions nationales et internationales de tir à l'arc sont suspendues pendant la durée de la guerre. Les infrastructures sportives, dont des terrains de tir à l'arc, sont souvent endommagées ou détruites. La guerre a un impact dramatique sur la communauté du tir à l'arc français. De nombreux archers perdent la vie ou sont gravement blessés.</p>

    </TextDiv>
  </ContainerDiv>
  </div>
);

const Article3 = () => (
  <div> 
      <RenaissanceText/>
      <Navbar>
  <Link to="section1" smooth={true}> PREMISSES </Link> |
  <Link to="section2" smooth={true}> MORT </Link> |
  <Link to="secondPostContainer" smooth={true}> RENAISSANCE </Link>
      </Navbar>
      <ContainerDiv>

<ImageDiv>
<img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={image2}/>
</ImageDiv>

<TextDiv>
  <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 2. L'épreuve de la guerre (1914-1918) </h1>
      <p style={{padding:'5%', textTransform:'uppercase'}}> 1914 : La Première Guerre mondiale éclate, bouleversant tous les aspects de la vie française. De nombreux archers, comme la plupart des hommes valides, sont mobilisés sur le front. Les compétitions nationales et internationales de tir à l'arc sont suspendues pendant la durée de la guerre. Les infrastructures sportives, dont des terrains de tir à l'arc, sont souvent endommagées ou détruites. La guerre a un impact dramatique sur la communauté du tir à l'arc français. De nombreux archers perdent la vie ou sont gravement blessés.</p>

  </TextDiv>
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
        <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 1. Fondation et essor (1899-1914) </h1>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1899 : La Fédération française de Tir à l'Arc (FFTA) est créée le 1er février à Paris, sous l'impulsion de Maurice Bouet et d'autres passionnés. Cette initiative vise à structurer et promouvoir la discipline en France.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1900 : Le tir à l'arc fait ses débuts aux Jeux Olympiques de Paris, avec des épreuves pour hommes et femmes. Cette reconnaissance internationale donne un coup de fouet à la popularité du sport.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> La FFTA organise le premier championnat national de tir à l'arc, marquant ainsi l'officialisation de la compétition en France.</p>
        <p style={{marginTop:'200px', marginLeft:'5px', textTransform:'uppercase', fontWeight:'bold', fontSize: '0.7rem', fontStyle:'italic'}}> Les années qui précèdent la Première Guerre mondiale sont marquées par une croissance constante du tir à l'arc en France. La création de nombreux clubs et associations à travers le pays témoigne de l'engouement pour cette discipline.</p>

    </TextDiv>

    <ImageDiv>
    <img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={image1}/>
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
    <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 2. L'épreuve de la guerre (1914-1918) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> 1914 : La Première Guerre mondiale éclate, bouleversant tous les aspects de la vie française. De nombreux archers, comme la plupart des hommes valides, sont mobilisés sur le front. Les compétitions nationales et internationales de tir à l'arc sont suspendues pendant la durée de la guerre. Les infrastructures sportives, dont des terrains de tir à l'arc, sont souvent endommagées ou détruites. La guerre a un impact dramatique sur la communauté du tir à l'arc français. De nombreux archers perdent la vie ou sont gravement blessés.</p>

    </TextDiv>

    <ImageDiv>
    <img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={image2}/>
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
                <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}>{post.title}</h1>
              </div>
  
              <div className="PostContent">
                <p style={{padding:'5%', textTransform:'uppercase'}}>{post.content}</p>
              </div>
            </TextDiv>
            
            <ImageDiv>
              <img style={{height:'100%', width:'100%', borderRadius:'15px',}} src={post.mediaURL} />
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
  border-radius: 35px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid white;
  background-color: #292929;
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  transform: translateX(185%);
`;

const NavbarIndividual = styled.div`
position: relative;
align-items: center;
border-radius: 35px;
top: 654px;
border: 1px solid white;
left: 57%;
width: 20%;
padding: 17.5px;
cursor: pointer;
background-color: #00A3FF;
`;

const NavbarIndividual2 = styled.div`
position: relative;
align-items: center;
border-radius: 35px;
border: 1px solid white;
top: 654px;
left: 50%;
width: 25%;
padding: 17.5px;
cursor: pointer;
background-color: #FF6B00;
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

width: 44%;
height: 600px;
border-radius: 15px;
background-color: #fff;
color: black;
`

const ImageDiv = styled.div`

width: 55%;
height: 600px;
border-radius: 15px;

`

const Post= styled.div`

display: flex;
flex-direction:row;
align-items: center;
margin-bottom: 2rem;
`

export default MortPage;