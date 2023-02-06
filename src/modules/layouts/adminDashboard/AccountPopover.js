import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_

import loginService from '../../../services/login.service';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profil',
    icon: 'eva:person-fill',
    linkTo: '#',
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  let navigate = useNavigate();

  React.useEffect(() => {
    loginService.getToken(localStorage.getItem('loginToken')).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setAccount(res.data)
      setIsLogin(true)
    })
  }, [])

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLogin, setIsLogin] = React.useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {isLogin ? (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {account.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {account.email}
            </Typography>
          </Box>
        ) : (
          <React.Fragment />
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {isLogin ? (
          <React.Fragment>
            <MenuItem component={RouterLink} to={"/dashboard"} sx={{ m: 1 }}>
              Dashboard
            </MenuItem>        
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack sx={{ m: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={() => {
              localStorage.removeItem('loginToken');
              localStorage.removeItem('user');
              setTimeout(() => {
                navigate("/", { replace: true });
                window.location.reload();
              }, 125);
            }} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MenuItem
              component={RouterLink}
              to={"/login"}
              sx={{ m: 1 }}>
              Login
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to={"/register"}
              sx={{ m: 1 }}>
              Registrieren
            </MenuItem>
          </React.Fragment>
        )}

      </MenuPopover>
    </>
  );
}
