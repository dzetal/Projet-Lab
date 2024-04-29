import styled from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'

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
    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();
 
    useEffect (() =>{
     const getPosts= async () =>{
         const data = await getDocs(postsCollectionRef);
         setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
     };
 
     getPosts();
    },[])
 
    const deletePost = async (id) =>{
     const postDoc = doc(db, "posts", id)
   await deleteDoc(postDoc)
    }
 
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

        <div className="HomeContainer"> 


        <div>
        <button style={{width:"75px", height:"75px"}} onClick={signUserOut}> Log out </button>
          <div>
                  <div className="btn-group me-2">
            <button style={{width:"75px", height:"75px"}} onClick={handleClick} type="button" className="btn btn-sm btn-outline-secondary">Add new post</button>
          </div>

        <div>
          {postLists.map((post)=>{
            return (
            
            <div key={post.id}> 

<div className="table-responsive small">
        <table className="table table-striped table-sm">
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
              <td> {isAuth && (<button onClick={() => {
            deletePost(post.id)
            }}> 
            &#128465; 
          </button>)}
          {isAuth && (<button onClick={() => {handleEdit(post.id)}}> edit </button>)}
           </td>
            </tr>
          </tbody>
        </table>
      </div>

            </div>
            )
          })}
        </div>
          
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