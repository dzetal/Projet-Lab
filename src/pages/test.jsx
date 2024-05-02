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

const Testexample = () => {
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
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 1. Fondation et essor (1899-1914) </h1>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1899 : La Fédération française de Tir à l'Arc (FFTA) est créée le 1er février à Paris, sous l'impulsion de Maurice Bouet et d'autres passionnés. Cette initiative vise à structurer et promouvoir la discipline en France.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> 1900 : Le tir à l'arc fait ses débuts aux Jeux Olympiques de Paris, avec des épreuves pour hommes et femmes. Cette reconnaissance internationale donne un coup de fouet à la popularité du sport.</p>
        <p style={{marginLeft:'26px', textTransform:'uppercase'}}> La FFTA organise le premier championnat national de tir à l'arc, marquant ainsi l'officialisation de la compétition en France.</p>
        <p style={{marginTop:'190px', marginLeft:'5px', textTransform:'uppercase', fontWeight:'bold', fontSize: '0.7rem', fontStyle:'italic'}}> Les années qui précèdent la Première Guerre mondiale sont marquées par une croissance constante du tir à l'arc en France. La création de nombreux clubs et associations à travers le pays témoigne de l'engouement pour cette discipline.</p>
      </div>
      <div style={{ height: '600px'}}>
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 2. L'épreuve de la guerre (1914-1918) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> 1914 : La Première Guerre mondiale éclate, bouleversant tous les aspects de la vie française. De nombreux archers, comme la plupart des hommes valides, sont mobilisés sur le front. Les compétitions nationales et internationales de tir à l'arc sont suspendues pendant la durée de la guerre. Les infrastructures sportives, dont des terrains de tir à l'arc, sont souvent endommagées ou détruites. La guerre a un impact dramatique sur la communauté du tir à l'arc français. De nombreux archers perdent la vie ou sont gravement blessés.</p>
      </div>
      <div style={{ height: '600px'}}>
      <h1 style={{padding:'5%', flexWrap:'nowrap', display:'inline-block', fontSize:'1.2rem', textTransform:'uppercase'}}> 3. Renaissance et renouveau (1918-1920) </h1>
        <p style={{padding:'5%', textTransform:'uppercase'}}> 1918 : Dès la fin de la guerre, les archers français reprennent progressivement leurs activités. Des compétitions locales et régionales sont organisées pour renouer avec la pratique sportive. Le tir à l'arc connaît un regain d'intérêt dans l'après-guerre, notamment chez les anciens combattants qui recherchent une activité physique et un moyen de se retrouver.
La FFTA joue un rôle crucial dans la renaissance du tir à l'arc français. Elle organise de nouveaux championnats nationaux et internationaux, encourage la création de clubs et met en place des programmes de formation pour les archers.
En conclusion, la période de 1899 à 1920 a été une période mouvementée pour la fédération française de tir à l'arc, marquée par des moments d'essor, d'interruption due à la guerre et de renouveau. Malgré les difficultés rencontrées, la passion des archers français a permis à la discipline de se développer et de se pérenniser.</p>
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
 
export default Testexample;