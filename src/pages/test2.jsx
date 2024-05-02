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
import top from "../images/ArrowTop.png"
import bottom from "../images/ArrowBottom.png"

gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const Testexample2 = () => {
    const contentRef = useRef(null);
    const currentPosition = useRef(0);
    const sectionHeight = 600; // Hauteur de chaque section (en pixels)
  
    // Définit le nombre de sections
    const numSections = 3;
  
    const navigate = (direction) => {
      if (!contentRef.current) return;
  
      let newPosition = currentPosition.current;
  
      if (direction === 'down') {
        newPosition = (newPosition + sectionHeight) % (sectionHeight * numSections); // Boucle au début après la dernière section
      } else if (direction === 'up') {
        newPosition = currentPosition.current - sectionHeight;
        if (newPosition < 0) {
          newPosition = sectionHeight * (numSections - 1); // Boucle à la fin si on va vers le haut après le premier
        }
      }
  
      gsap.to(contentRef.current, {
        y: -newPosition,
        duration: 0.5,
        ease: 'power2.inOut',
      });
  
      currentPosition.current = newPosition;
    };
    return (     
         <TextDiv>
    <NavButton style={{bottom:'87%'}} onClick={() => navigate('up')} >
      <img style={{width:'100%', height:'100%'}} src={top}/>
    </NavButton>

    <div
      ref={contentRef}
      style={{
        height: sectionHeight * numSections, // Ajustez la hauteur totale
        position: 'absolute',
        top: 0,
      }}
    >
      <div style={{ height: '600px' }}>
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 1. Stabilisation et développement (1920-1940)</h1>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> Les années 1920 sont consacrées à la reconstruction de la fédération et des infrastructures sportives après les ravages de la Première Guerre mondiale. La Fédération française de Tir à l'Arc (FFTA) connaît une croissance constante en termes de nombre de licenciés et de clubs. L'organisation régulière de championnats nationaux et internationaux attire de nouveaux talents et renforce la visibilité du tir à l'arc en France. De nouvelles techniques et de nouveaux équipements font leur apparition, contribuant à l'amélioration des performances des archers.</p>
      </div>
      <div style={{ height: '600px'}}>
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 2. Les défis de la Seconde Guerre mondiale (1940-1945) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> La Seconde Guerre mondiale entraîne une nouvelle fois l'interruption des compétitions nationales et internationales. La guerre affecte une nouvelle fois la communauté du tir à l'arc français, avec la mobilisation des archers et la destruction d'infrastructures. Malgré les difficultés, certains archers continuent de pratiquer leur discipline dans la clandestinité, témoignant de leur passion et de leur attachement au sport.</p>
      </div>
      <div style={{ height: '600px'}}>
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 3. Renouveau et expansion (1945-1970) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> La FFTA s'efforce de maintenir le haut niveau des archers français face à une concurrence internationale accrue. La fédération met en place des actions pour attirer de nouveaux publics, notamment les jeunes et les femmes. L'organisation des Jeux Olympiques de Paris en 2024 représente un enjeu majeur pour la FFTA, qui ambitionne de briller à domicile.
        L'après-guerre est marquée par un nouvel essor du tir à l'arc en France. La FFTA enregistre une forte augmentation du nombre de licenciés et de clubs. De nouvelles disciplines, comme le tir à l'arc en salle et le tir sur cible animalière, gagnent en popularité. Les archers français commencent à se distinguer sur la scène internationale, remportant des médailles lors de championnats européens et mondiaux. Le tir à l'arc se démocratise et se répand dans les écoles et les centres de loisirs, touchant un public de plus en plus large.
         En résumé, la période de 1920 à 1970 a été marquée par la stabilisation et le développement de la fédération française de tir à l'arc, malgré les interruptions dues aux guerres mondiales. Cette période a également vu l'émergence de nouveaux talents et la diversification des pratiques, contribuant à l'expansion et à la reconnaissance du tir à l'arc en France.</p>
       
      </div>
    </div>

    <NavButton style={{top:'87%'}} onClick={() => navigate('down')}>
    <img style={{width:'100%', height:'100%'}} src={bottom}/>
    </NavButton>
  </TextDiv>
    );
}

const TextDiv = styled.div`
overflow: hidden; // Empêche de voir d'autres sections
position: relative;
overflow: hidden;
width: 44%;
height: 600px;
border-radius: 15px;
background-color: #fff;
color: black;
font-family:'MaPolice' sans-serif;
`

const NavButton = styled.button`
z-index: 1;
  position: absolute;
  width: 80px;
  height: 70px;
  left: 100%;
  transform: translateX(-100%);
  border: none;
  background-color: #fff;
  cursor: pointer;
`;
 
export default Testexample2;