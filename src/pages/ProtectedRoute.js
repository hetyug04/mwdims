import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const ProtectedRoute = ({children}) => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    if(!user){
        navigate('login')
    }
    return children
}

export default ProtectedRoute