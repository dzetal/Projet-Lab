import React, { useEffect, useState, useRef} from 'react';
import { Link, Element, scroller } from 'react-scroll'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,TextPlugin);

const PremissePage = () => {
    const containerRef = useRef(null);
    const timeline = useRef(null);
  
    useEffect(() => {
      // Créez une chronologie pour l'animation
      timeline.current = gsap.timeline({ paused: true });
  
      timeline.current.to(containerRef.current, {
        x: '-100vw', // Déplacez de 50% de la largeur pour révéler la section "about"
        duration: 0.5,
        ease: 'power3.easeInOut',
      });
    }, []);

    const handleAboutClick = () => {
        timeline.current.play(); // Déplacez vers la section "about"
      };
    
      const handleHomeClick = () => {
        timeline.current.reverse(); // Retour à la section "home"
      };

    return ( 

    <div style={{ overflow: 'hidden', width: '100%' }}> 
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'row', // Les sections sont côte à côte
          width: '200%', // Permet aux sections de se déplacer sur une ligne
          transform: 'translateX(0)', // Position de départ
        }}
      >
        <section className="home" style={{ width: '50%', minWidth: '50%' }}>
          <nav>
            <div onClick={handleAboutClick} className="link-about">About</div>
          </nav>
          <h1>Rio</h1>
          <p>Woof woof! I'm Rio, the most charming and charismatic dog in town.</p>
        </section>

        <section className="about" style={{ width: '50%', minWidth: '50%' }}>
          <nav>
            <div onClick={handleHomeClick} className="link-home">Home</div>
          </nav>
          <h1>Rio</h1>
          <p>You can often find me lounging on the couch, snoring and dreaming of bacon.</p>
        </section>
      </div>

      <div style={{marginTop:'50px'}} className="table-responsive small">
          {postLists.map((post)=>{
            return (
            <div key={post.id}> 
        <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Image/Video URL</th>
          <th scope="col">Extra URL</th>
          <th scope="col">Action</th>
              
        </tr>
      </thead>
      <tbody>
            <tr>
              <td>{truncateText(post.title, 11) || "vide"}</td>
              {/* <td>{post.title}</td> */}
              <td>{truncateText(post.content, 11) || "vide"}</td>
              {/* <td>{post.content}</td> */}
              <td>{post.debutdate || "vide"}</td>
              <td>{post.enddate || "vide"}</td>
              <td>{truncateText(post.mediaURL, 11) || "vide"}</td>
              {/* <td>{post.mediaURL}</td> */}
              <td>{truncateText(post.videoURL, 11) || "vide"}</td>
              {/* <td>{post.videoURL || "N/A"}</td> */}
              <td>  <button onClick={() => {
            deletePost(post.id)
            }}> 
            &#128465; 
          </button>
          <button onClick={() => {handleEdit(post.id)}}> edit </button>
            </td>
          </tr>
      </tbody>
    </table>


            </div>
            )
          })}
        </div>

    </div>
     );
}
 
export default PremissePage;