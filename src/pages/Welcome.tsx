import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Box, Typography } from '@mui/material';
import { Layout } from '../components/layouts/Layout';


export const Welcome = () => {

    const { user } = useContext( AuthContext );

    return (
      <Layout>
          <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 285px)'
            sx={{ flexDirection: { xs: 'column', sm: 'column' } }}    
          >
            <Typography
              variant='body1'
              fontSize={25}
              textAlign='center'
              marginBottom={1}
            >
              Hola, <span style={{ fontWeight: 500 }}>{ user?.name }</span>
            </Typography>
            <Typography
              variant='body1'
              fontSize={25}
              textAlign='center'
            >
              Inicio de Sesión: <span style={{ fontWeight: 500 }}>{ new Date().toLocaleDateString() + ' a las ' + new Date().toLocaleTimeString() }</span>
            </Typography>
          </Box>
      </Layout>
    )
}