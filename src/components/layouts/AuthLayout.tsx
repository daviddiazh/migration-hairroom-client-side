import React, { FC } from 'react'
import { Box } from '@mui/material';

interface Props {
    children?: any;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <>
        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                { children }
            </Box>
        </main>
    </>
  )
}

export default AuthLayout;