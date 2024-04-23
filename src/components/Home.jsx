import styled from "styled-components";
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

        <FirstPostContainer>
          <ContentDiv>

          </ContentDiv>
          <ContentDiv>

          </ContentDiv>
          <ContentDiv>

          </ContentDiv>
        </FirstPostContainer>

        <SecondPostContainer>
          {postLists.map((post)=>{
            return (
            
            <Post key={post.id} index={post.index}> 
            <ContainerText> 
            <div className="PostTitle">
               <h3> {post.title} </h3>

            <div className="DateContainer">
               <p> {post.debutdate} - {post.enddate} </p> 
            </div> 
            </div>

            <div className="PostContent">
               <p> {post.content} </p> 
            </div>
            </ContainerText>

            <div> 
              <img src={post.mediaURL}/>
              
            </div>

            <div className="PostMediaPreview">
              {post.videoURL && renderMediaPreview(post.videoURL)}
            </div>

            </Post>
            )
          })}
        </SecondPostContainer>
        </div>
     );
}

const FirstPostContainer= styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
border: solid 2px black;
margin-top: 50px;
`

const ContentDiv= styled.div`

width: 200px;
height: 300px;
border: solid 2px black;
`

const SecondPostContainer= styled.div`

display: flex;
flex-direction: column;
border: solid 2px black;
margin-top: 50px;
padding: 5%;
`

const Post= styled.div`

display: flex;
flex-direction:row;
flex-direction: ${({ index }) => (index % 2 === 0 ? "row" : "row-reverse")};
align-items: center;
margin-bottom: 2rem;
border: 1px solid #ddd;
`

const ContainerText= styled.div`

display: flex;
flex-direction: column;
justify-content: space-between;
border: solid 2px yellow;
margin-top: 25px;
`
 
export default Home;