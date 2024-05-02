// import styled from "styled-components";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import image from "../images/Arc.png"
import home from "../images/accueil.png"
import edit from "../images/editer.png"
import out from "../images/sortie.png"
import add from "../images/ajouter.png"
import photo from "../images/photos.png"



const CreatePost = () => {
  const { postId } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia]= useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [error, setError] = useState(null);
    const postsCollectionRef = collection(db, "posts");
    const [imagePreview, setImagePreview] = useState(null);;
    let navigate = useNavigate();

    useEffect(() => {
        const loadPostToEdit = async () => {
            if (postId) {
                const postDocRef = doc(db, "posts", postId);
                const postSnapshot = await getDoc(postDocRef);
                const postData = postSnapshot.data();
                setTitle(postData.title);
                setContent(postData.content);
            }
        };
        loadPostToEdit();
    }, [postId]);


    const handleMediaChange = (event) =>{
      
      const file = event.target.files[0];
      setMedia(file);
    }


    const createPost = async () =>{
      if (!title || !content || !media) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
    
      if (postId) {
        const postDocRef = doc(db, "posts", postId);
        await updateDoc(postDocRef, {
          title,
          content,
        });
      } else {
        let postData = {
          title,
          content,
        };
    
        if (media) {
          const mediaRef = ref(storage, `media/${media.name}`);
          try {
            await uploadBytes(mediaRef, media);
            const mediaURL = await getDownloadURL(mediaRef); // Obtenir l'URL du fichier
            postData.mediaURL = mediaURL; // Ajouter l'URL au postData
          } catch (err) {
            console.error("Erreur d'upload :", err);
            setError("Erreur lors de l'upload du média.");
            return;
          }
        }
    
        if (videoURL) {
          postData.videoURL = videoURL;
        }
    
        await addDoc(postsCollectionRef, postData);
      }
        navigate('/Admin');
    };

    const handleDivClick = () => {
      document.getElementById('fileInput').click();
    };

    const handleMediaChangeFile = (event) => {
      const file = event.target.files[0]; // Récupérer le premier fichier sélectionné
      if (file) {
        const reader = new FileReader(); // Créer un lecteur de fichiers
        reader.onloadend = () => {
          setImagePreview(reader.result); // Mettre à jour l'aperçu avec le contenu du fichier
        };
        reader.readAsDataURL(file); // Lire le fichier comme URL de données
      }
      setMedia(file);
    };


    return ( 
 <div className="CeatePost" style={{display:'flex', flexDirection:'row', height:'100%'}}>

<div
      className="d-flex flex-column flex-shrink-0 bg-body-tertiary"
      style={{ width: '4.5rem' }}
    >
            <a
        href="/"
        className="d-block p-3 link-body-emphasis text-decoration-none"
        title="Icon-only"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        <svg className="bi pe-none" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="visually-hidden">Icon-only</span>
      </a>

      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <Link
            to='/admin'
            className="nav-link py-3 border-bottom rounded-0"
            aria-current="page"
            title="Home"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <div style={{width:'25px', height:'25px'}}>
              <img style={{width:'100%', height:'100%'}} src={home}/>
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/CreatePost"
            className="nav-link active py-3 border-bottom rounded-0"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <div style={{width:'25px', height:'25px'}}>
              <img style={{width:'100%', height:'100%'}} src={add}/>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="nav-link py-3 border-bottom rounded-0"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <div style={{width:'25px', height:'25px'}}>
              <img style={{width:'100%', height:'100%'}} src={edit}/>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="nav-link py-3 border-bottom rounded-0"
            title="Orders"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <div style={{width:'25px', height:'25px'}} >
               <img style={{width:'100%', height:'100%'}} src={out}/>  
              </div>
          </Link> 
        </li>
      </ul>

    </div>

   <PostContainer>

   <h1 style={{marginBottom:'30px',  fontFamily:'MaPolice sans-serif',}}>{postId ? "MODIFIER" : "AJOUTER"}</h1>
   {error && <p>{error}</p>}
 
      <PostTitleInput>
      <input placeholder="Titre" 
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={{borderBottom:'1px solid', borderTop:'0', borderLeft:'0', borderRight:'0',  fontFamily:'MaPolice sans-serif',borderColor:'#006CEB'}}
        />
      </PostTitleInput>

      <div> 
      <div className="PostMediaInput"
            onClick={handleDivClick}   
            style={{
        width: '90px',
        height: '90px',
        display: 'flex',
        border: imagePreview ? 'none' : '2px solid #ccc',
        backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer', 
        marginTop: '20px',
        marginBottom: '20px',
      }}>

{!imagePreview && (
        <img
          style={{ width: '40px', height: '40px' }} 
          src={photo} // Utilisez l'image "photo"
        />
      )}

        <input id="fileInput"
        type="file"
        accept="image/*, video/*"
        onChange={handleMediaChangeFile}
        style={{
          display: 'none',
          fontFamily:'MaPolice sans-serif', // Masquer l'input
        }}/>
      </div>
      </div>


      <PostTitleInput>
        <label htmlFor="title"> Contenu </label>
      <textarea placeholder="write your post" 
        value={content} 
        onChange={(event) => setContent(event.target.value)}
        style={{height:'45vh',  fontFamily:'MaPolice sans-serif'}}
       
        />
      </PostTitleInput>

      {/* <div>
          <label>Video URL:</label>
          <input type="text" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} />
      </div>  */}


      <button style={{marginTop:'10px',  fontFamily:'MaPolice sans-serif',}} className="btn btn-primary w-100 py-2" onClick={createPost}>{postId ? "Enregistrer" : "Ajouter"} </button>

    </PostContainer>
  </div>
     );
}

const PostContainer = styled.table`
display:flex;
flex-direction:column;
justify-content: center;
width: 100%;
padding: 5%;
font-family:'MaPolice' sans-serif;
`; 

const PostTitleInput = styled.table`
display: flex;
flex-direction:column;
font-family:'MaPolice' sans-serif;
`; 


export default CreatePost;