import React, { useContext, useState } from 'react'
import AuthLayout from '../components/layouts/AuthLayout';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { validations } from '../utils';
import authApi from '../api/authApi';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../context/auth/AuthContext';
import { Link as LinkRRD, useNavigate } from 'react-router-dom';


type FormData ={
    name: string;
    email: string;
    password: string;
}

const SignIn = () => {

    const navigate = useNavigate();
    const { registerUser } = useContext( AuthContext )

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ( { name, email, password }: FormData ) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser( name, email, password )

        if( hasError ){
            setShowError(true)
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000)
            return;
        }

        navigate('/admin/welcome');

    }

  return (
    <>
        <Box style={{ margin: '20px 50px' }}>
            <LinkRRD to='/'>
                <Link display='flex' alignItems='center' style={{ cursor: 'pointer' }}>
                    <ArrowBackIcon />
                    <Typography variant='h6' >Volver</Typography>
                    
                </Link>
            </LinkRRD>
        </Box>
        <AuthLayout>
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={ 2 }>
                        <Grid item>
                            <Typography variant='h1' component='h1'>Registrarse</Typography>
                            <Chip 
                                label='Correo o Contraseña no válidos para el registro'
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
                                label='Nombre Completo' 
                                variant='filled' 
                                fullWidth 
                                {
                                    ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'El nombre debe contener mínimo 2 caracteres' }
                                    })
                                }
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
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
                                        validate: ( value ) => validations.isEmail( value )
                                    })
                                }
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Contraseña' 
                                type='password'
                                variant='filled' 
                                fullWidth 
                                {
                                    ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'La contraseña debe contener mínimo 6 caracteres' }
                                    })
                                }
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button 
                                type='submit'
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                                sx={{ backgroundColor: 'secondary.main',
                                    '&:hover': {
                                        backgroundColor: 'info.main',
                                    }, 
                                }}
                            >
                                ¡Crear cuenta!
                            </Button>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '1rem .5rem', paddingLeft: '1rem'}}>
                            <hr style={{ width: '135px', height: '2px', margin: 'auto 0' }} />
                            <Typography sx={{padding: '0 .5rem'}}>O</Typography>
                            <hr style={{ width: '135px', height: '2px', margin: 'auto 0' }} />
                        </Box>

                        <Grid item xs={ 12 } textAlign='center' sx={{ marginTop: '-1.5rem'}}>
                            <LinkRRD to='/auth/login'>
                                <Link alignItems='center' style={{ cursor: 'pointer' }} underline='always' >
                                    <Typography variant='body1'>¿Ya tienes cuenta?</Typography>
                                </Link>
                            </LinkRRD>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    </>
  )
}

export default SignIn;