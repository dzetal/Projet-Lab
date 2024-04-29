import { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const ScrollingReverseTexte = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
    
        //text.innerHTML += text.innerHTML;
        
        const textWidth = text.offsetWidth / 2;
        console.log(textWidth);
        const containerWidth = text.offsetParent.offsetWidth;
        const duration = textWidth / 50;

        gsap.set(text, { x: -192 });
    
        gsap.to(text, {
          x: 0, 
          duration: 2.7,
          repeat: -1,
          ease: 'linear',
        });
      }, []);
    return ( 
        <div
        style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        width: '100%', 
        position: 'relative', 
        }}
      >
        <div ref={textRef} style={{ display: 'inline-block', fontSize:'4rem', color:'white' }}>
           MORT  MORT  MORT MORT  MORT  MORT  MORT MORT  MORT  MORT 
        </div>
  
        
      </div>
     );
}
 
export default ScrollingReverseTexte;