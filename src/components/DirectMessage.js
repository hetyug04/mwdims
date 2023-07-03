import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ChatContext from '../Context/ChatContext';
import { db } from '../firebase';
import styled from "styled-components";

const Wrapper = styled.div`

`


const DirectMessage = ({chat}) => {
    const {user} = useContext(AuthContext)
    const {dispatch, data} = useContext(ChatContext)
    const handleSelect = async(chat) =>{
      var concatUID = ''
      if(chat?.uid=="global"){
        concatUID = 'global'
      }
      else{
        concatUID = user.uid > chat.uid ? user.uid + chat.uid : chat.uid + user.uid;
      }
        const docRef = doc(db, 'messages', concatUID)
        const docSnap = await getDoc(docRef)
    
        const addRef = doc(db, 'userChats', user?.uid)
        console.log(chat)
        await updateDoc(addRef, {
          userChats: arrayUnion(chat)
        })
    
        const addRecieverRef = doc(db, 'userChats', chat?.uid)
        const userData = {displayName: user.displayName, photoURL: user.photoURL, uid: user.uid}
        await updateDoc(addRecieverRef, {
          userChats: arrayUnion(userData)
        })
        console.log(docSnap.exists())
        if(!docSnap.exists()){    
          await setDoc(doc(db, 'messages', concatUID), {
            messages: [],
          })
        }
        else{
          dispatch({type: 'CHANGE_USER', payload: {chat, concatUID}})
          console.log(chat)
        }
    
      }
    
  return (
    <div  key={chat.uid} className="directMessage searchPair" onClick={()=>handleSelect(chat)}>
        <img src={chat?.photoURL} alt="" referrerPolicy="none"/>
            <div className="dmInfo">
                <span className='dmName'>{chat.displayName}</span>
                <span className='newMessage'>New Message</span>
            </div>
    </div>
  )
}

export default DirectMessage