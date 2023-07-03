import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from 'react';
import { db } from '../firebase';
import DirectMessage from './DirectMessage';
import styled from "styled-components";

const Wrapper = styled.div`
.searchWrapper {
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  .searchBar {
    border: none;
    width: 90%;
    height: 3rem;
    border-bottom: 1px black solid;
    outline: none;
    font-size: 15px;
    align-self: center;
    &::placeholder {
      font-size: 15px;
      text-align: center;
      color: lightgray;
    }
  }
}
`
const Search = () => {
  const [search, setSearch] = useState()
  const [result, setResult] = useState()
  const handleChange = (e) =>{
    setSearch(e.target.value)
  }
  const searchForUser = async() =>{
    const searchRef = collection(db, 'users')
    const searchQ = query(searchRef, where("displayName", "==", search))
    const querySnapshot = await getDocs(searchQ);
    querySnapshot.forEach((doc) => {
      const temp = []
      temp.push(doc.data())
      setResult(temp)
      console.log(temp)
});
  }
  const handleKey = (e) => {
    e.code === "Enter" && searchForUser();
  };
  return (
    <Wrapper>
    <div className="searchWrapper">
      {result?.map((sResult)=>(
        <DirectMessage chat={sResult}/>
      ))}
        <input className='searchBar' placeholder='Search...' type="text" onChange={handleChange} onKeyDown={handleKey}/>
    </div>
    </Wrapper>

  )
}

export default Search