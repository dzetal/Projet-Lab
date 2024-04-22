import styled from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig'
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

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + '...';
//     }
//     return text || "";
//   };

   
    return ( 

        <div className="HomeContainer"> 

        <h1>Admin interface</h1>
        <button onClick={handleClick}> Add new post </button>
        <button onClick={signUserOut}> Log out </button>


        <div>
          {postLists.map((post)=>{
            return (
            
            <div key={post.id}> 

<StyledTable>
<TableHeader>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Content</TableHeaderCell>
          <TableHeaderCell>Start Date</TableHeaderCell>
          <TableHeaderCell>End Date</TableHeaderCell>
          <TableHeaderCell>Image/Video URL</TableHeaderCell>
          <TableHeaderCell>Extra URL</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableCell>{post.title}</TableCell>
            <TableCell>{post.content}</TableCell> 
            {/* <TableCell>{truncateText(post.content, 30) || "N/A"}</TableCell>  */}
            <TableCell>{post.debutdate}</TableCell>
            <TableCell>{post.enddate}</TableCell>
            <TableCell>{post.mediaURL}</TableCell>
            {/* <TableCell>{truncateText(post.mediaURL, 30) || "N/A"}</TableCell> */}
            <TableCell>{post.videoURL}</TableCell>
                    <div className="DeletePost">

          {isAuth && (<button  onClick={() => {
            deletePost(post.id)
            }}> 
            &#128465; 
          </button>)}
          
        </div>

        <div className="EditPost">
        {isAuth && (<button onClick={() => {handleEdit(post.id)}}> edit </button>)}
        </div>

        </StyledTable>

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