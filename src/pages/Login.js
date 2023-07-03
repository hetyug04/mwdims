import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signInWithRedirect } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider, signInWithPopup } from '../firebase'


const Login = () => {

  const navigate = useNavigate()

  const googleSignIn = async() =>{
    await signInWithPopup(auth, provider)
    navigate('/')
    console.log('signin')
  }
    


  return (
        <div className="loginWrapper">
        <h1 className='title'>Monkey With The <br/> IMS.</h1>
        <button className="loginButton" onClick={()=>googleSignIn()} >Sign in With  <FontAwesomeIcon icon={faGoogle} /> </button>
        <p>Made with <FontAwesomeIcon icon={faHeart} style={{color: 'black'}} />, by Het Patel</p>
        </div>
  )
}

export default Login