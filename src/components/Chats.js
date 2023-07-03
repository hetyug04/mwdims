import { onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { db, doc } from '../firebase'
import DirectMessage from './DirectMessage'
import Search from './Search'
import ChatContext from '../Context/ChatContext'
import styled from "styled-components";

const Wrapper = styled.div`
.chatsWrapper {
  display: flex;
  flex-direction: column;

  .chatsTitle {
    color: white;
    font-weight: 300;
    text-align: center;
    font-size: 15px;
  }
  .chatsList {
    width: 23rem;
    min-height: 42rem;
    background-color: white;
    border-radius: 10px 10px 0 0;

    .directMessage {
      margin-top: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: rgb(207, 207, 207);
      }

      img {
        margin: 0 2rem 0 1rem;
        height: 60px;
        width: 60px;
        border-radius: 40px;
        object-fit: cover;
        display: flex;
      }
      .dmInfo {
        display: flex;
        flex-direction: column;
        height: 5rem;
        justify-content: center;
        gap: 10px;
        .dmName {
          font-size: 24px;
          font-weight: 700;
        }
        .newMessage {
          font-size: 16px;
          font-weight: 300;
          color: gray;
        }
      }
    }
  }
}
`


const Chats = () => {

  const [chats, setChats] = useState()
  const {showMenu} = useContext(ChatContext)
  const {user} = useContext(AuthContext)
  const {setShowMenu,showChatBar} = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data().userChats)
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  

 
  return (
    <Wrapper>
    <div className='chatsWrapper'>
        <span className="chatsTitle">Messages</span>
        <div className="chatsList">
            <Search/>
            <div className="messages"></div>
            {chats?.map((chat) =>(
            <DirectMessage chat={chat}/>
            ))}
        </div>
    </div>
    </Wrapper>

  )
}

export default Chats