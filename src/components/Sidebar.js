import React, { useContext, useEffect, useState } from "react";
import { Chats } from "./index.js";
import { AuthContext } from "../Context/AuthContext.js";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ChatContext from "../Context/ChatContext.js";

const Wrapper = styled.div`
  display: flex;
  .sidebarWrapper {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #7b335c;
    flex: 1.25;
    border-radius: 0px 10px 10px 0px;

    .userInfo {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin-top: 10px;

      .userImage {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 40px;
      }
      p {
        font-size: 20px;
        color: white;
        font-weight: 300;
      }
    }
  }

  .active {
    display: block;
  }
  .hidden {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    .sidebarWrapper {
      margin: 0 auto;
    }
  }
`;

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { showChatBar, setShowChatBar, showMenu, setShowMenu } =
    useContext(ChatContext);

  const updateMedia = () => {
    if (window.innerWidth > 1000) {
      setShowMenu(true);
      setShowChatBar(true);
    } else {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <Wrapper>
      {showMenu && (
        <div className={`sidebarWrapper`}>
          <div className="userInfo">
            <img
              className="userImage"
              src={user?.photoURL}
              alt=""
              referrerPolicy="no-referrer"
            />
            <p>{user?.displayName}</p>
            <FontAwesomeIcon
              className="logOut"
              onClick={() => signOut(auth)}
              icon={faSignOut}
            />
          </div>
          <Chats />
        </div>
      )}
    </Wrapper>
  );
};

export default Sidebar;
