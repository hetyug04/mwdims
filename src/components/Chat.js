import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { doc, db } from "../firebase";
import {
  arrayUnion,
  onSnapshot,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import ChatContext from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Loading from "../Images/loading2.png";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  .cWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    .messages {
      height: 36rem;
      overflow-y: auto;
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .message {
        display: inline-block;
        width: fit-content;
        max-width: 15rem;
        word-wrap: break-word;
        margin-left: 10px;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 500;
        padding: 10px;
        border-radius: 20px 20px 20px 0;
        background-color: rgb(194, 194, 194);
      }
      .sender {
        border-radius: 20px 20px 0 20px;
        align-self: flex-end;
        margin-right: 10px;
        background-color: lightBlue;
      }
      .imageSender {
        border-radius: 20px 20px 0 20px;
        align-self: flex-end;
        padding: -10px;
        margin-right: 10px;
      }
    }
  }
  .conversationProfile {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 6.5rem;
    align-items: center;
    border-bottom: 1px black solid;
    .conversationImage {
      margin-top: 6px;
      height: 70px;
      width: 70px;
      object-fit: cover;
      border-radius: 60px;
    }
    span {
      font-size: 20px;
      font-weight: 300;
    }
  }

  .chatBar {
    align-self: center;
    border-top: 1px black solid;
    height: 4.5rem;
    width: 95%;
    display: flex;
    align-items: center;
    input {
      width: 90%;
      height: 70%;
      outline: none;
      border: none;
      font-size: 20px;
      &::placeholder {
        color: lightgray;
      }
    }

    .chatFunctions {
      display: flex;
      font-size: 30px;
      gap: 10px;
    }
    .chatFunctions > * {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1000px){
    .cWrapper{
      height: 100%;
    }
    .cWrapper .messages .message{
     width: 40vw;
    }
  }
  @media screen and (max-width: 680px){

  }
`;

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { showMenu, showChatBar } = useContext(ChatContext);
  const [currReciever, setCurrReciever] = useState();
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [file, setFile] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const aref = useRef(null);
  const scrollRef = useRef(null);
  const inputFile = useRef(null);
  const storage = getStorage();
  const [menu, setMenu] = useState("block");

  var uuid = crypto.randomUUID().replaceAll("-", "");
  const storageRef = ref(storage, `images/${uuid}`);
  const reciever = data.chatId.replace(user.uid, "");
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "messages", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    getUser();
    scrollToBottom();
  }, [messages]);

  const sendImage = async () => {
    if (!loading && data.chatId != "global") {
      setLoading(true);
      console.log(loading);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          await updateDoc(doc(db, "messages", data.chatId), {
            messages: arrayUnion({ photoURL: downloadURL, origin: user.uid }),
          });
        });
      });
    }
    setFile(null);
    setLoading(false);
    console.log(loading);
  };
  const getUser = async () => {
    const docRef = doc(db, "users", reciever);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCurrReciever(docSnap.data());
      console.log(currReciever.photoURL);
      console.log(faImage);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const handleChange = (e) => {
    setMsg({ msg: e.target.value, origin: user.uid });
  };
  const sendMessage = async () => {
    setLoading(true);
    if (data.chatId != "global") {
      if (msg) {
        await updateDoc(doc(db, "messages", data.chatId), {
          messages: arrayUnion(msg),
        });
      }
    }
    if (file) {
      sendImage();
    }
    setLoading(false);
    aref.current.value = "";
  };
  const handleFileSelect = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    console.log("scrolled");
  };
  const handleKey = (e) => {
    e.code === "Enter" && sendMessage();
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <Wrapper>
      {showChatBar &&
      <div className="cWrapper">
      <div className="conversationProfile">
        <img
          className="conversationImage"
          src={currReciever && currReciever.photoURL}
          alt=""
        />
        <span>{currReciever && currReciever.displayName}</span>
      </div>
      <div className="messages">
        {messages ? (
          messages.map((message) => (
            <div
              style={
                message.photoURL ? { backgroundColor: "transparent" } : {}
              }
              className={`${message.msg && "message"} ${
                message.origin == user.uid && "sender"
              }`}
            >
              {message.msg ? (
                message.msg
              ) : (
                <img
                  className={`imgMSG ${
                    message.origin == user.uid && "imageSender"
                  }`}
                  src={message.photoURL}
                ></img>
              )}
            </div>
          ))
        ) : (
          <div className="placeHolder">Say Something </div>
        )}
      </div>
      <div ref={scrollRef} style={{ visibility: "hidden" }}></div>
      <div className="chatBar">
        <input
          ref={aref}
          type="text"
          placeholder="Type Something..."
          defaultValue=""
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <div className="chatFunctions">
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={inputFile}
          ></input>
          <FontAwesomeIcon
            type="file"
            icon={faImage}
            onClick={onButtonClick}
          ></FontAwesomeIcon>
          {loading ? (
            <img style={{ width: "2rem" }} src={Loading} alt="" />
          ) : (
            <FontAwesomeIcon
              className="sendButton"
              icon={faPaperPlane}
              onClick={() => sendMessage()}
            />
          )}
        </div>
      </div>
    </div> }
  
      
    </Wrapper>
  );
};

export default Chat;
