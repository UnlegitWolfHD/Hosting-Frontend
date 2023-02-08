import { useEffect, useState } from 'react';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import Iconify from '../../components/Iconify';

// mock

import { EditModal } from '../../sections/admin/user';

import UserService from '../../../services/user.service';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Username', alignRight: true },
  { id: 'mail', label: 'E-Mail', alignRight: true },
  { id: 'role', label: 'Berechtigungs Level', alignRight: true },
  { id: 'isVerified', label: 'Aktiviert', alignRight: true },
  { id: 'status', label: 'Status', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export default function User() {
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selfAdminLevel, setSelfAdminLevel] = useState(0)
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [maxItems, setMaxItems] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllUser("")
  }, [page, rowsPerPage, filterName])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const getAllUser = () => {
    let search = filterName
    if (filterName === "") search = "."
    UserService.getAllUser(search, page, rowsPerPage)
      .then(res => {
        setUser(res.data.result)
        setMaxItems(res.data.totalCount)
      })
  }

  const deleteUser = (id) => {
    UserService.deleteUserById(id)
      .then(res => {
        setTimeout(() => {
          getAllUser(filterName)
        }, 25);
      })
  }

  const editUser = (data) => {
    setEditModalOpen(false)
    UserService.updateUser(true, data)
      .then(res => {
        setTimeout(() => {
          getAllUser(filterName)
        }, 25);
      })
  }

  const verifyUser = (user) => {
    UserService.activateUser(user)
      .then(res => {
        setTimeout(() => {
          getAllUser(filterName)
        }, 25);
      })
  }

  const lockUser = (user, state) => {
    UserService.lockUser(user, state)
      .then(res => {
        setTimeout(() => {
          getAllUser(filterName)
        }, 25);
      })
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Benutzer
          </Typography>
        </Stack>
        <Modal
          open={isEditModalOpen ? true : false}
          onClose={() => setEditModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isEditModalOpen ?
              <EditModal onFinish={editUser} data={isEditModalOpen} selfAdminlevel={selfAdminLevel} /> : <div />}
          </Box>
        </Modal>
        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder={"Benutzer Suchen"} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {user.map((row) => {
                    const { id, name, email, adminlevel, isActive, isLocked } = row;
                    
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                      >
                        <TableCell align="center" component="th" scope="row" padding="none">
                          {name}
                        </TableCell>
                        <TableCell align="center">{email}</TableCell>
                        <TableCell align="center">{adminlevel}</TableCell>
                        <TableCell align="center">
                          {isActive ? <Iconify icon="eva:checkmark-square-2-outline" width={32} height={32} /> : <Iconify icon="eva:close-circle-outline" width={32} height={32} />}
                        </TableCell>
                        <TableCell align="center">
                          {!isLocked ? <Iconify icon="eva:unlock-outline" width={32} height={32} /> : <Iconify icon="eva:lock-fill" width={32} height={32} />}
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu onEdit={() => setEditModalOpen(row)} onDelete={() => deleteUser(id)} onVerify={() => verifyUser(row)} onLock={(state) => lockUser(row, state)} isVerify={isActive} isLocked={isLocked}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                {user.length === 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={maxItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
