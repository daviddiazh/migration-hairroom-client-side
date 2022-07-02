import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  
    const { user } = useContext( AuthContext );
    const token = localStorage.getItem('TOKEN-USER')

    if( !token ){

        return <Navigate to='/' /> 
    }

    return children;

}



