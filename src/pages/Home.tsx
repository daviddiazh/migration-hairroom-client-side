import { Box, Link, Typography } from '@mui/material';
import { Layout } from '../components/layouts/Layout';
import { Link as LinkRRD } from 'react-router-dom';
import { useEffect } from 'react';


const Home = () => {

  useEffect(() => {
    const disableButton = window.oncontextmenu = () => {
      return false
    }

    disableButton();
  }, [])

  return (
    <div>
      <Layout>
        <Box 
          display='flex' 
          justifyContent='center' 
          alignItems='center' 
          height='calc(100vh - 285px)'
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}    
        >
          <LinkRRD to='/newOrder' className='withoutUnderline'>
            <Link display='flex' alignItems='center' style={{ cursor: 'pointer' }}>
              <Typography variant='h1' color='secondary' fontSize={50} fontWeight={200}>Soy Cliente |</Typography>
            </Link>
          </LinkRRD>
          <LinkRRD to='/auth/login' className='withoutUnderline'>
            <Link display='flex' alignItems='center' style={{ cursor: 'pointer', marginLeft: 10 }} >
              <Typography variant='h1' fontSize={50} fontWeight={200}>Soy Admin</Typography>
            </Link>
          </LinkRRD>

        </Box>

      </Layout>
    </div>
  )
}

export default Home
