import styled from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import image from "../images/Arc.png"
import home from "../images/accueil.png"
import edit from "../images/editer.png"
import poubelle from "../images/poubelle1.png"
import out from "../images/sortie.png"
import add from "../images/ajouter.png"
import { Modal, Button } from 'react-bootstrap';

const Admin = () => {


    const [isAuth, setIsAuth]= useState(localStorage.getItem("isAuth"));
    const signUserOut = () => {
        signOut(auth).then(()=>{
          localStorage.clear();
            setIsAuth(false);
            window.location.pathname='/Login'
          
        });
      };
    const [postLists, setPostLists] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const [showModal, setShowModal] = useState(false); 
  const [postToDelete, setPostToDelete] = useState(null); 

    let navigate = useNavigate();
 
    useEffect (() =>{
     const getPosts= async () =>{
         const data = await getDocs(postsCollectionRef);
         setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
     };
 
     getPosts();
    },[])
 
  const handleDelete = async () => {
    if (postToDelete) {
      const postDoc = doc(db, "posts", postToDelete);
      await deleteDoc(postDoc);
      setPostLists((posts) =>
        posts.filter((post) => post.id !== postToDelete)
      );
      setShowModal(false); 
      setPostToDelete(null);
    }
  };

  const openDeleteModal = (id) => {
    setPostToDelete(id); 
    setShowModal(true); 
  };

  const closeDeleteModal = () => {
    setShowModal(false); 
    setPostToDelete(null); 
  };
 
    const handleEdit = (id) => {
     navigate(`/CreatePost/${id}`);
    }
 
    const renderMediaPreview = (videoURL) => {
     if (videoURL.includes("youtube.com")) {
       const videoId = videoURL.split("v=")[1];
       return (
         <iframe
           width="560"
           height="315"
           src={`https://www.youtube.com/embed/${videoId}`}
           title="YouTube video player"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
         ></iframe>
       );
     } else {
       return <p>Media Preview Not Available</p>;
     }
   };

   const handleClick = () => {
    navigate('/CreatePost');
  };

  const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') {
      return 'vide'; // Retourne 'N/A' si le texte est indéfini ou n'est pas une chaîne de caractères.
    }
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text; // Retourne le texte original si sa longueur est égale ou inférieure à maxLength.
  };

   
    return ( 

        <div className="HomeContainer" style={{display:'flex', flexDirection:'row', height:'100%'}}> 
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
            className="nav-link active py-3 border-bottom rounded-0"
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
            className="nav-link py-3 border-bottom rounded-0"
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
            to=""
            className="nav-link py-3 border-bottom rounded-0"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <div style={{width:'25px', height:'25px', fontFamily:'MaPolice sans-serif',}}>
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
            onClick={signUserOut}
          >
            <div style={{width:'25px', height:'25px'}} >
               <img style={{width:'100%', height:'100%'}} src={out}/>  
              </div>
          </Link> 
        </li>
      </ul>

    </div>

        <div style={{width:'100%', height:'100vh', padding:'1%', fontFamily:'MaPolice sans-serif',}}>
        
          <div> 

          <button onClick={handleClick} type="button" className="btn btn-primary"> Ajouter </button>
        <div style={{marginTop:'50px'}} className="table-responsive small">
        <table className="table table-striped table-sm">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Content</th>
        <th scope="col">Image/Video URL</th>
        <th scope="col">Extra URL</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {postLists.map((post) => (
        <tr key={post.id}>
          <td>{truncateText(post.title, 11) || 'vide'}</td>
          <td>{truncateText(post.content, 11) || 'vide'}</td>
          <td>{truncateText(post.mediaURL, 11) || 'vide'}</td>
          <td>{truncateText(post.videoURL, 11) || 'vide'}</td>
          <td>
          <button
                      style={{ border: "none", width: "40px", height: "40px", fontFamily:'MaPolice', }}
                      onClick={() => openDeleteModal(post.id)}
                    >
                      <img style={{ width: "25px", height: "25px" }} src={poubelle} />
                    </button>
            <button style={{border:'none', width:'40px', height:'40px'}} onClick={() => handleEdit(post.id)}>
              <img style={{width:'25px', height:'25px'}} src={edit}/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>


            </div>

            <Modal show={showModal} onHide={closeDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
            </div>
          
          </div>
        </div>
     
     
     );
}
 

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  
  }
`;

const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
`;

export default Admin;