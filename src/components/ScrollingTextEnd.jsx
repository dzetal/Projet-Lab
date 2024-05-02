import { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const ScrollingTextEnd = () => {

    
    const containerRef = useRef(null);
    const textRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current;
      const text = textRef.current;

  
        const textWidth = text.offsetWidth / 2; // La largeur de l'original
        const duration = textWidth / 50; // Définir la durée en fonction de la largeur et de la vitesse
    
        gsap.to(text, {
          x: -424,
          duration: 2.7,
          repeat: -1,
          ease: 'linear',
        });
      }, []);

    return (  

        <div
        ref={containerRef}
        style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        width: '100%', 
        position: 'relative', 
        }}
      >
        <div ref={textRef} style={{ display: 'inline-block', fontSize:'6rem', color:'white', fontWeight:'bold', fontFamily:'MaPolice',  }}>
          RENAISSANCE RENAISSANCE RENAISSANCE RENAISSANCE RENAISSANCE RENAISSANCE RENAISSANCE RENAISSANCE
        </div>
  
        
      </div>
    );
}
 
export default ScrollingTextEnd;