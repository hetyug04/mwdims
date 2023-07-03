import React, { useContext, useEffect } from 'react'
import { Chat, Sidebar } from '../components/index.js'
import { AuthContext } from '../Context/AuthContext.js'
import { db, doc, getDoc, setDoc } from '../firebase'
import styled from 'styled-components'
import ChatContext from '../Context/ChatContext.js'

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
.homeWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 25px;
  font-weight: 700;
  width: 100%;
}
.showMenu{
  display: none;
}
.chatWrapper {
    width: 80%;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    min-height: fit-content;
    height: 100vh;
}

@media screen and (max-width: 1000px){
  .showMenu{
    display: block;
  }
}
@media screen and (max-width: 680px){
  .homeWrapper{
    .title{
      margin-bottom: .35rem;
    }
  }
  .chatWrapper{
    width: 100%;

  }
}
`

const Home = () => {

  const {user} = useContext(AuthContext)
  const {showMenu, setShowMenu, setShowChatBar, showChatBar} = useContext(ChatContext)

  useEffect(()=>{
   addToUsers() 
  })

  const addToUsers = async() =>{

    const docRef = doc(db, 'users', user?.uid)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
      await setDoc(doc(db, 'users', user?.uid), {
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL : user?.photoURL,
      })
      await setDoc(doc(db, 'userChats', user?.uid), {
        userChats: [{displayName: 'global', uid: 'global'}],
      })
    }
    
  }

  const showMenuItems=()=>{
    setShowMenu(!showMenu);
    setShowChatBar(!showChatBar);
  }

  return (
    <Wrapper>
    <div className='homeWrapper'>
        <h1 className="title">
            MWDIMS.
        </h1>
        <div class="showMenu" onClick={()=>showMenuItems()}>Show Menu</div>
        <div className="chatWrapper">
            <Chat/>
            <Sidebar style={{display : "block"}}/>
        </div>
    </div>
    </Wrapper>

  )
}

export default Home