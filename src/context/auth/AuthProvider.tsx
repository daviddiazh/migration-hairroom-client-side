import { useEffect, useReducer } from 'react';
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

        if( !localStorage.getItem('TOKEN-USER') ){
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN-USER')}`,
                'x-token': `${localStorage.getItem('TOKEN-USER')}`,
            }
        }

        try {
            console.log('dentro del trycatch')
            const { data } = await authApi.get('/validate-token', config);
            const { name, role } = data;
            console.log('data: ', data)
            dispatch({ type: 'Auth - Login', payload: {name, role} });
        } catch (error) {
            console.log(error)
        }
    }
    

    const loginUser = async ( email: string, password: string ): Promise<boolean> => { 

        try {
            const { data } = await authApi.post('/login', { email, password } );
            const { token, user } = data;  
            dispatch({ type: 'Auth - Login', payload: user });
            localStorage.setItem('token', token);
            localStorage.setItem('TOKEN-USER', token);
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
            localStorage.setItem('TOKEN-USER', token);
            dispatch({ type: 'Auth - Login', payload: user });
            return {
                hasError: false,
                
            }
        } catch (error) {
            if( axios.isAxiosError( error ) ){
                return{
                    hasError: true,
                }
            }

            return{
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }

    }

    const logout = () => {
        localStorage.removeItem('TOKEN-USER');
    }


    return (
        <AuthContext.Provider value={{
            ...state, 

            //Methods
            checkToken,
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

