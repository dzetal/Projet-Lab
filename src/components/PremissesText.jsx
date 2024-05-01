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

const PremissesText = () => {
    const textRef = useRef(null);

    useEffect(() => {
      const textElement = textRef.current;
  
      const textContent = textElement.innerText;
      const words = textContent.split(' ');
  
      textElement.innerText = '';
  
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        span.style.display = 'inline-block'; 
        span.style.opacity = 0; 
        textElement.appendChild(span);
        
        if (index < words.length - 1) {
          const space = document.createElement('span');
          space.innerText = ' ';
          textElement.appendChild(space);
        }
      });
  
      gsap.fromTo(
        textElement.childNodes,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: textElement,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, []);
  

    return ( 
        <TextContainer>
        <AnimatedText ref={textRef}>
          LES PREMISSES
        </AnimatedText>
      </TextContainer>
     );
}

const TextContainer = styled.div`
  margin-bottom: 200px;
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AnimatedText = styled.div`
  font-size: 8rem; 
`;
 
export default PremissesText;