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

const HoverEffect2 = ({ src, width, height }) => {
    const imageRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
        x: -width / 2, 
        duration: 0.5, 
        ease: 'power1.inOut', 
      });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          x: 0, 
          duration: 0.5, 
          ease: 'power1.inOut', 
        });
      };
    return ( 

        <div
      style={{
        overflow: 'hidden',
        width: '436px', 
        height: '660px', 
          borderRadius: '20px',
          
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
 
export default HoverEffect2;