// import styled from "styled-components";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = ({isAuth}) => {
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



    return ( 
        <div className="HomeContainer"> 
        
        <h1> Your at home </h1>

        <div className="PostContainer">
          {postLists.map((post)=>{
            return (
            
            <div className="Post" key={post.id}> 
            <div className="PostTitle">
               <h3> {post.title} </h3> 
            </div>

            <div className="DateContainer">
               <p> {post.debutdate} - {post.enddate} </p> 
            </div>

            <div className="PostContent">
               <p> {post.content} </p> 
            </div>
            
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

            <div> 
              <img src={post.mediaURL}/>
              
            </div>

            <div className="PostMediaPreview">
              {post.videoURL && renderMediaPreview(post.videoURL)}
            </div>

            </div>
            )
          })}
        </div>
        </div>
     );
}
 
export default Home;