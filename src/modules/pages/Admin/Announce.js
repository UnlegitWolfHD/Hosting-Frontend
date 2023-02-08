import { useEffect, useState } from 'react';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Box,
  Modal,
  TablePagination
} from '@mui/material';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';

import  {AnnounceListHead, AnnounceListToolbar, AnnounceMoreMenu } from '../../sections/@dashboard/announce';

import { CreateModal, EditModal } from '../../sections/admin/announce';

// mock

import AnnouncementService from '../../../services/announcements.service';

import { fToNow } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Titel', alignRight: true },
  { id: 'description', label: 'Beschreibung', alignRight: true },
  { id: 'postedAt', label: 'Erstellung', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export default function Announce() {
  const [announcements, setAnnouncements] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [maxItems, setMaxItems] = useState(0);

  useEffect(() => {
    getAllAnnouncements()
  }, [filterName, page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getAllAnnouncements = () => {
    let search = filterName
    if (filterName === "") search = "."
    AnnouncementService.getAll(search, page, rowsPerPage)
      .then(res => {
        setAnnouncements(res.data.paginatedAnnouncements)
        setMaxItems(res.data.count)
      })
  }

  const deleteAnnounce = (id) => {
    AnnouncementService.deleteAnnounceById(id)
      .then(res => {
        setTimeout(() => {
          getAllAnnouncements()
        }, 25);
      })
  }

  const createAnnounce = (data) => {
    setCreateModalOpen(false)
    setTimeout(() => {
      getAllAnnouncements()
    }, 25);
  }

  const editAnnounce = (data) => {
    setEditModalOpen(false)
    AnnouncementService.updateAnnounce(data)
      .then(res => {
        setTimeout(() => {
          getAllAnnouncements()
        }, 25);
      })
  }

  return (
    <Page title="Announce">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ankündigung
          </Typography>
          <Button variant="contained" onClick={() => setCreateModalOpen(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
            Erstellen
          </Button>
          <Modal
            open={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreateModal onFinish={createAnnounce} />
            </Box>
          </Modal>
          <Modal
            open={isEditModalOpen? true : false}
            onClose={() => setEditModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isEditModalOpen ?
                <EditModal onFinish={editAnnounce} data={isEditModalOpen} /> : <div />}
            </Box>
          </Modal>
        </Stack>

        <Card>
          <AnnounceListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder={"Ankündigung Suchen"} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AnnounceListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={announcements.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {announcements.map((row) => {
                    const { id, title, description, postedAt } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                      >
                        <TableCell align="center" component="th" scope="row" padding="none">
                          {title}
                        </TableCell>
                        <TableCell align="center">{description}</TableCell>
                        <TableCell align="center">{fToNow(postedAt)}</TableCell>

                        <TableCell align="right">
                          <AnnounceMoreMenu onEdit={() => setEditModalOpen(row)} onDelete={() => deleteAnnounce(id)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {announcements.length === 0 && (
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
