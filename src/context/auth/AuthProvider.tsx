import { FC, useEffect, useReducer } from 'react';
import { IUser } from '../../interfaces/User';
import { AuthContext, authReducer } from './';
import authApi from '../../api/authApi';
import axios from 'axios';

export interface AuthState{
    isLoggedIn: boolean;
    user?: IUser 
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: React.FC<any> = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
      checkToken();
    }, [])

    const checkToken = async () => {

        if( !localStorage.getItem('token') ){
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-token': `${localStorage.getItem('token')}`,
            }
        }

        try {
            const { data } = await authApi.get('/validate-token', config);
            const { token, user } = data;
            localStorage.setItem('token', token);
            dispatch({ type: 'Auth - Login', payload: user });
        } catch (error) {
            localStorage.removeItem('token');
        }
    }
    

    const loginUser = async ( email: string, password: string ): Promise<boolean> => { 

        try {
            const { data } = await authApi.post('/login', { email, password } );
            console.log('DATA: ', data)
            const { token, user } = data;  
            console.log('USER EN EL ENDPOINT: ', user)
            localStorage.setItem('token', token);
            dispatch({ type: 'Auth - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }

    const registerUser = async ( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await authApi.post('/signIn', { name, email, password });
            const { token, user } = data;
            localStorage.setItem('token', token);
            dispatch({ type: 'Auth - Login', payload: user });
            return {
                hasError: false,
                
            }
        } catch (error) {
            if( axios.isAxiosError( error ) ){
                return{
                    hasError: true,
                    //message: error.response?.data.message
                }
            }

            return{
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }

    }

    const logout = () => {
        localStorage.removeItem('token');
        //router.reload();
    }


    return (
        <AuthContext.Provider value={{
            ...state, 

            //Methods
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

