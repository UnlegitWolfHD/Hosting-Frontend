import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Divider } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

import loginService from '../../../services/login.service';


// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const [account, setAccount] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    loginService.getToken(localStorage.getItem('loginToken')).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setAccount(res.data)
      setIsLogin(true)
    })
  }, [])


  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
          {isLogin ? (
            <NotificationsPopover />
          ): (
            <React.Fragment/>
          )}
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
      <Divider/>
    </RootStyle>
  );
}
