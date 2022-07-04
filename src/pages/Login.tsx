import React, { useContext, useState } from 'react'
import AuthLayout from '../components/layouts/AuthLayout';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { validations } from '../utils';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../context/auth/AuthContext';
import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import GetOut from '../components/ui/GetOut';

type FormData = {
    email: string,
    password: string
}

const Login = () => {

    const navigate = useNavigate();
    const { loginUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async ( { email, password }: FormData ) => {

        setShowError(false);

        const isValidLogin = await loginUser( email, password );

        if( !isValidLogin ){
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
            return;
        }

        //TODO: navegar a otra página privada
        navigate('/admin/welcome')
    }

  return (
      <>
        <GetOut />
        {
            localStorage.getItem('TOKEN-USER') 
            ? <Navigate to='/' /> 
            : (
                <AuthLayout>
                    <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                        <Box sx={{ width: 350, padding: '10px 20px' }}>
                            <Grid container spacing={ 2 }>
                                <Grid item>
                                    <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                                    <Chip 
                                        label='Correo o Contraseña no válidos'
                                        color='error'
                                        icon={ <ErrorOutline />}
                                        className='fadeIn'
                                        sx={{ display: showError ? 'flex' : 'none' }}
                                        style={{ margin: '10px 0' }}
                                    />
                                </Grid>

                                <Grid item xs={ 12 }>
                                    <TextField 
                                        autoComplete='off'
                                        type='email'
                                        label='Correo Eléctronico' 
                                        variant='filled' 
                                        fullWidth 
                                        { 
                                            ...register('email', {
                                                required: 'Este campo es requerido',
                                                validate: ( value ) => validations.isEmail(value)
                                            })}
                                        error={ !!errors.email }
                                        helperText={ errors.email?.message }
                                    />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <TextField 
                                        type='password'
                                        label='Contraseña' 
                                        variant='filled' 
                                        fullWidth 
                                        { 
                                            ...register('password', { 
                                                required: 'Este campo es requerido', 
                                                minLength: { value: 6, message: 'La contraseña debe contener mínimo 6 caracteres' 
                                            }})}
                                        error={ !!errors.password }
                                        helperText={ errors.password?.message }
                                    />
                                </Grid>

                                <Grid item xs={ 12 }>
                                    <Button 
                                        className='circular-btn' 
                                        size='large' 
                                        fullWidth
                                        type='submit'
                                        sx={{ backgroundColor: 'secondary.main',
                                            '&:hover': {
                                                backgroundColor: 'info.main',
                                            }, 
                                        }}
                                    >
                                        Ingresar
                                    </Button>
                                </Grid>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '1rem .5rem', paddingLeft: '1rem'}}>
                                    <hr style={{ width: '135px', height: '2px', margin: 'auto 0' }} />
                                    <Typography sx={{padding: '0 .5rem'}}>O</Typography>
                                    <hr style={{ width: '135px', height: '2px', margin: 'auto 0' }} />
                                </Box>
                                <Grid item xs={ 12 } sx={{ marginTop: '-1.3rem'}} textAlign='center'>
                                    <LinkRRD to='/auth/signIn'>
                                        <Link style={{ cursor: 'pointer' }} underline='always' >
                                            <Typography variant='body1' >¿No tienes cuenta? ¡Crea una gratis!</Typography>
                                        </Link>
                                    </LinkRRD>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </AuthLayout>
            )
        }
      </>
    
  )
}

export default Login;