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
    })
 
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
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text || "";
  };

   
    return ( 

        <div className="HomeContainer"> 

<div className="container-fluid">
      <div className="row">
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
          <div
            className="offcanvas-md offcanvas-end bg-body-tertiary"
            tabIndex="-1"
            id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="sidebarMenuLabel">
                Company name
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="/">
                    <svg className="bi">
                      <use xlinkHref="#house-fill" />
                    </svg>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-2" to="/orders">
                    <svg className="bi">
                      <use xlinkHref="#file-earmark" />
                    </svg>
                    Orders
                  </Link>
                </li>

                {/* Continuez avec les autres éléments du menu */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

        <button onClick={signUserOut}> Log out </button>

        <div class="btn-group me-2">
            <button onClick={handleClick} type="button" class="btn btn-sm btn-outline-secondary">Add new post</button>
          </div>

        <div>
          {postLists.map((post)=>{
            return (
            
            <div key={post.id}> 

<div class="table-responsive small">
        <table class="table table-striped table-sm">
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
              <td>{truncateText(post.title, 11) || "N/A"}</td>
              <td>{truncateText(post.content, 30) || "N/A"}</td>
              <td>{post.debutdate}</td>
              <td>{post.enddate}</td>
              <td>{truncateText(post.mediaURL, 30) || "N/A"}</td>
              <td>{post.videoURL}</td>
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