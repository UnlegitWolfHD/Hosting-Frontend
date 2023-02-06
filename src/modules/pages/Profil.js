import React, { useEffect, useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { ProfilForm, GameForm } from '../sections/user/profil';

import loginService from '../../services/login.service';
import userService from '../../services/user.service';
import gameService from '../../services/game.service';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


// ----------------------------------------------------------------------

export default function Profil() {
  const [userData, setUserData] = useState(undefined)
  const [gameData, setGameData] = useState(undefined)

  useEffect(() => {
    loginService.getToken().then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUserData(res.data)
      gameService.getUserGames(res.data.id).then((res2) => {
        setGameData(res2.data)
      })
    })
  }, [])

  const saveData = (data) => {
    userService.updateUser(false, {
      id: userData.id,
      name: data.username,
      email: data.email,
      allowExtraEmails: userData.allowExtraEmails
    }).then((res) => {
      localStorage.setItem('loginToken', res.data);
      loginService.getToken(res.data)
        .then((res2) => {
          localStorage.setItem('user', JSON.stringify(res2.data));
        }).catch((error) => {
          localStorage.removeItem('loginToken');
          localStorage.removeItem('user');
        });
    }).catch((error) => {
      setTimeout(() => {
        console.log(error.response.data)
      }, 1000);
    });
  }

  return (
    <Page title="Profil">
      <RootStyle>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Profil
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}></Typography>
          {userData ? (<ProfilForm userData={userData} onSubmitData={saveData} />) : <React.Fragment />}
          <Typography sx={{ color: 'text.secondary', mb: 5 }}></Typography>
          {gameData ? (<GameForm gameData={gameData} />) : <React.Fragment />}
        </Container>
      </RootStyle>
    </Page>
  );
}
