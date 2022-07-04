import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  
    const token = localStorage.getItem('TOKEN-USER')

    if( !token ){
        return <Navigate to='/' /> 
    }

    return children;

}



