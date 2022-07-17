import {filter} from 'lodash';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination, TableHead,
} from '@mui/material';
// components
import * as API from '../constants/index';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead} from '../sections/@dashboard/user';
import Data from '../_mock/rooms';
import CreateRoomModal from "../components/room/CreateRoomModal";
import UpdateRoomModal from "../components/room/UpdateRoomModal";
import {applySortFilter, getComparator} from "../sections/@dashboard/common";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'no', label: 'No'},
    {id: 'name', label: 'Room name', alignRight: false},
    {id: 'dom', label: 'Doom name', alignRight: false},
    {id: 'maxStudent', label: 'Max student per room', alignRight: false},
    {id: 'option', label: 'Option', alignRight: false},
];

// ----------------------------------------------------------------------

export default function Rooms() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listUsers, setListUsers] = useState([]);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const navigate = useNavigate();

    const [reLoad, setReLoad] = useState(false);

    useEffect(() => {
        // fetch(API.users)
        //     .then(res => res.json())
        //     .then((res) => {
        //         setListUsers(res);
        //     });
    }, [reLoad]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data.length) : 0;

    const filteredUsers = applySortFilter(Data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="Rooms">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Rooms
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={() => setOpenCreateModal(!openCreateModal)}
                    >
                        New Room
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={Data.length}
                                    onRequestSort={handleRequestSort}
                                    isShowHeadCheckbox={false}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const {id, name, max_student} = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                            >
                                                <TableCell>{index}</TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell/>
                                                <TableCell align="left">{max_student}</TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Button variant="contained" onClick={() => setOpenUpdateModal(true)}>Edit</Button>
                                                        <Button variant="contained">Delete</Button>
                                                        <Button variant="contained" onClick={() => navigate('/dashboard/contracts')}>View Contract</Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                <SearchNotFound searchQuery={filterName}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={Data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <CreateRoomModal
                        openCreateModal={openCreateModal}
                        setOpenCreateModal={setOpenCreateModal}
                        reLoad={reLoad}
                        setReLoad={setReLoad}/>

                    <UpdateRoomModal
                        openUpdateModal={openUpdateModal}
                        setOpenUpdateModal={setOpenUpdateModal}
                        reLoad={reLoad}
                        setReLoad={setReLoad}/>
                </Card>
            </Container>
        </Page>
    );
}
