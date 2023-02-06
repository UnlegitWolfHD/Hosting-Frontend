import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import UserService from '../../services/user.service';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Users() {
  const [users, setUser] = React.useState([])
  const [selectedUser, setSelectedUser] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isLocked, setIsLocked] = React.useState(false)

  const [loading, setLoading] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");

  React.useEffect(() => {
    getAllUser()
  }, [searchString])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    [],
  );

  const getAllUser = () => {
    setLoading(true)
    let search = searchString
    if (searchString === "") search = "."
    UserService.getAllUser(search)
      .then(res => {
        setTimeout(() => {
          setUser(res.data)
          setLoading(false)
        }, 50);
      })
  }

  const getUser = (id) => {
    UserService.getUserById(id)
      .then(res => {
        setTimeout(() => {
          setSelectedUser(res.data)
          setUsername(res.data.name)
          setEmail(res.data.email)
          setIsLocked(res.data.isLocked)
          setOpen(true)
        }, 125);
      })
  }

  const saveUser = () => {
    UserService.updateUser(true, {
      id: selectedUser.id,
      name: username,
      email: email
    }).then((res) => {
      getAllUser()
    })
  }

  const activateUser = (user) => {
    setLoading(true)
    UserService.activateUser(user).then((res) => {
      setTimeout(() => {
        setLoading(false)
        getAllUser()
      }, 100);
    })
  }

  const lockUser = (user, status) => {
    setLoading(true)
    UserService.lockUser(user, status).then((res) => {
      setTimeout(() => {
        setLoading(false)
        getUser(selectedUser.id)
      }, 100);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, ml: 4, mr: 4, height: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center" width={300}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  wrap='nowrap'
                  width={300}>
                  <TextField
                    id="search"
                    label="Suche"
                    name="search"
                    value={searchString} onChange={(e) => setSearchString(e.target.value)}
                    autoComplete='off'
                  />
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center" width={300}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width={300}
                  >
                    <Button variant="outlined" size="medium" onClick={() => getUser(row.id)}>
                      Verwalten
                    </Button>
                    {!row.isActive ? (
                      <Button variant="outlined" size="medium" color='success' onClick={() => activateUser(row)}>
                        Freigeben
                      </Button>
                    ) : (
                      <React.Fragment />
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BootstrapDialog
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
          setOpen(false)
        }}>
          {username}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              height: 250
            }}>
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              sx={{
                height: 250,
                width: "100%"
              }}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                  height: 250,
                  width: "90%"
                }}>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    height: 250,
                    width: "100%"
                  }}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    autoComplete='off'
                  />
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Addresse"
                    name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error">Passwort zurücksetzen</Button>
          {isLocked ? (
            <Button variant="contained" color="success" onClick={() => lockUser(selectedUser, !isLocked)}>entsperren</Button>
          ) : (
            <Button variant="contained" color="error" onClick={() => lockUser(selectedUser, !isLocked)}>sperren</Button>
          )}
          <Button variant="outlined" autoFocus onClick={() => {
            setOpen(false)
            saveUser()
          }}>
            Speichern
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider >
  );
}