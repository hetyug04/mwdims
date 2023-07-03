import React, { createContext, useReducer, useState, useEffect } from 'react'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: 'global',
    user: {},
  }

  const chatReducer = (state, action) => {
    var tempId = ''
    if (action.payload.uid == 'global') {
      tempId = 'global'
    } else {
      tempId = action.payload.concatUID
    }
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: tempId,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  const [showMenu, setShowMenu] = useState(false)
  const [showChatBar, setShowChatBar] = useState(true);



  const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  return (
    <ChatContext.Provider value={{ data: state, dispatch, showMenu, setShowMenu, showChatBar, setShowChatBar }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContext
