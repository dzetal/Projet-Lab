import { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const HoverEffect3 = ({ src, width, height }) => {
    const imageRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
        x: -width / 2, // Déplacer vers la gauche de la moitié de la largeur de l'image
        duration: 0.5, // Durée de l'animation
        ease: 'power1.inOut', // Courbe d'animation
      });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          x: 0, // Revenir à la position d'origine
          duration: 0.5, // Durée de l'animation
          ease: 'power1.inOut', // Courbe d'animation
        });
      };
    return ( 

        <div
      style={{
        overflow: 'hidden',
          width: `${width / 2}px`, // La moitié de la largeur
          height: `${height}px`, 
          borderRadius: '20px',
          // La hauteur d'origine
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
          src={src}
          alt="Animé"
        ref={imageRef}
        style={{
          position: 'relative',
            width: `${width}px`, // La largeur complète de l'image
            height: `${height}px`,
            border: 'none', 
            // La hauteur complète de l'image
            
          }}
        />
    </div>
     );
}
 
export default HoverEffect3;