// import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreatePost = ({isAuth}) => {
  const { postId } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia]= useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [error, setError] = useState(null);
    const [debutdate, setDebutdate] = useState('');
    const [enddate, setEnddate] = useState('');

    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();

    useEffect(() => {
        const loadPostToEdit = async () => {
            if (postId) {
                const postDocRef = doc(db, "posts", postId);
                const postSnapshot = await getDoc(postDocRef);
                const postData = postSnapshot.data();
                setTitle(postData.title);
                setContent(postData.content);
                setDebutdate(postData.debutdate);
                setEnddate(postData.enddate);
            }
        };
        loadPostToEdit();
    }, [postId]);


    const handleMediaChange = (event) =>{
      
      const file = event.target.files[0];
      setMedia(file);
    }


    const createPost = async () =>{
      if (!title || !content || !debutdate || !enddate) {
        setError("Please fill in all required fields.");
        return;
      }
    
      if (postId) {
        const postDocRef = doc(db, "posts", postId);
        await updateDoc(postDocRef, {
          title,
          content,
          debutdate,
          enddate
        });
      } else {
        let postData = {
          title,
          content,
          debutdate,
          enddate
        };
    
        if (media) {
          const mediaRef = ref(storage, `media/${media.name}`);
          await uploadBytes(mediaRef, media);
          const mediaURL = await getDownloadURL(mediaRef);
          postData.mediaURL = mediaURL;
        }
    
        if (videoURL) {
          postData.videoURL = videoURL;
        }
    
        await addDoc(postsCollectionRef, postData);
      }
        navigate('/');
    };

    useEffect ( () => {
      if(!isAuth){
        navigate('/');
      }
    }, []);



    return ( 
 <div className="CeatePost">
   <div className="PostContainer">

   <h1>{postId ? "Edit post" : "Create a post"}</h1>
   {error && <p>{error}</p>}
 
      <div className="PostTitleInput">
      <input placeholder="title" 
        value={title}
        onChange={(event) => setTitle(event.target.value)}/>
      </div>

      <div className="PostContentInput">
      <textarea placeholder="write your post" 
        value={content} 
        onChange={(event) => setContent(event.target.value)}/>
      </div>

      <div className="DebutDateContainer">
      <label>Start date:</label>
      <input type="date" value={debutdate} onChange={(event) => setDebutdate(event.target.value)} />
      </div>

      <div className="EndDateContainer">
      <label>End date:</label>
      <input type="date" value={enddate} onChange={(event) => setEnddate(event.target.value)} />
      </div>

      <div className="PostMediaInput">
        <input type="file" accept="image/*, video/*" onChange={handleMediaChange}/>
      </div>

      <div>
          <label>Video URL:</label>
          <input type="text" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} />
      </div> 

      <button onClick={createPost}>{postId ? "Save changes" : "Submit post"} </button>

    </div>
  </div>
     );
}
 
export default CreatePost;