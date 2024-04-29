import React, { useEffect } from 'react';
import { Link, Element, scroller } from 'react-scroll';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

// Composants spécifiques pour chaque section
const Section1 = () => (
    <div>
      <h2>Hihi</h2>
      <p>Bienvenue à la section 1</p>
    </div>
  );
  
  const Section2 = () => (
    <div>
      <h2>Haha</h2>
      <p>Ceci est la section 2. Contenu plus complexe ici.</p>
    </div>
  );
  
  const Section3 = () => (
    <div>
      <h2>Huhu</h2>
      <p>Bienvenue à la section 3. Vous pouvez ajouter des éléments spécifiques.</p>
    </div>
  );

const sections = [
    { id: 'section1', title: 'Hihi ', component: Section1  },
    { id: 'section2', title: 'haha ', component: Section2  },
    { id: 'section3', title: 'huhu ', component: Section3  },
  ];

const MortPage = () => {
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

    return (    <div>
      <nav style={{ position: 'fixed', right: '10px', top: '10px' }}>
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.id}
            smooth={true}
            duration={500}
          >
            {section.title}
          </Link>
        ))}
      </nav>

      {sections.map((section) => (
        <Element
          key={section.id}
          name={section.id}
          style={{
            height: '100vh',
            backgroundColor: section.id % 2 === 0 ? 'darkgray' : 'gray',
          }}
        >
          {section.title}
          {React.createElement(section.component)}
        </Element>
      ))}
    </div> );
}
 
export default MortPage;