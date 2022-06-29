import React, { FC, useContext } from "react";
import { Link as LinkRRD } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';
import { AuthContext } from "../../context/auth";
import { LoginOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar: FC = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const imagePath = `/images/Logo.png`;

  const onLogout = () => {

    logout()

    //router.replace('/auth/autentication');
    window.location.reload();

  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

  return (
    <AppBar>
      <Toolbar>
        <LinkRRD to="/">
          <Link
            display="flex"
            alignItems="center"
            style={{ cursor: "pointer" }}
          >
            {/* <Typography variant="h6">Peluqueria |</Typography>
            <Typography sx={{ ml: 0.5 }}>App</Typography> */}
            <img
              src={imagePath}
              alt="Logo de la App"
              width={75}
              height={75}
            />
          </Link>
        </LinkRRD>
           
        <Box flex={1} />

        {
          isLoggedIn ? (
            
            <>
              <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ bgcolor: '#fff' }}
            >
                <Avatar src={user?.name} alt={ user?.name } sx={{ bgcolor: 'secondary.main', width: 30, height: 30 }}></Avatar>   
                <Typography color='black' alignItems='center' marginLeft={1} fontWeight={500}>{user?.name.split(' ')[0]}</Typography>
              </Button>
            </>

          ) : (
            <Box style={{ marginTop: "7px" }}>
              <LinkRRD to="/new">
                <Link style={{ cursor: "pointer" }}>
                  Pedido
                  <IconButton>
                    <Badge badgeContent={1} color="secondary">
                      <ShoppingCartOutlined />
                    </Badge>
                  </IconButton>
                </Link>
              </LinkRRD>
            </Box>
          )
        }

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <LinkRRD to="/admin/clients/">
            <Link
              display="flex"
              alignItems="center"
              style={{ cursor: "pointer" }}
              //underline='always'
              textAlign='center'
              sx={{ pt: 1, pb: 1}}
            >
              <Typography 
                sx={{ ml: 0.5}}
                textAlign='center'
                marginRight={1}
              >
                  Ordenes
              </Typography>
              <ListIcon />
            </Link>
          </LinkRRD>
        </MenuItem>
        <MenuItem onClick={handleClose}>{
          isLoggedIn && (
            <Box sx={{ mr: -6 }}>
              <ListItem button onClick={ onLogout } 
              sx={{
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                    }, 
                }}
              >
                <span style={{ marginRight: 10 }}>Salir</span>
                
                <LoginOutlined/>

                <span style={{ marginRight: 30 }}></span>
              </ListItem>
            </Box>

          )
        }</MenuItem>
      </Menu>
        
      </Toolbar>
    </AppBar>
  );
};
