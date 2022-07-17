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
import CreateRoomModal from "../components/room/CreateRoomModal";
import UpdateRoomModal from "../components/room/UpdateRoomModal";
import {applySortFilter, getComparator} from "../sections/@dashboard/common";
import Data from "../_mock/contract";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'no', label: 'No'},
    {id: 'student', label: 'Student', alignRight: false},
    {id: 'room', label: 'Room name', alignRight: false},
    {id: 'startDate', label: 'Start Date', alignRight: false},
    {id: 'endDate', label: 'End Date', alignRight: false},
    {id: 'pricePerMonth', label: 'Price / Month', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: '', label: 'Option', alignRight: false},
];

// ----------------------------------------------------------------------

export default function Contracts() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listUsers, setListUsers] = useState([]);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [reLoad, setReLoad] = useState(false);

    const navigate = useNavigate();

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
        <Page title="Contracts">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Contracts
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={() => setOpenCreateModal(!openCreateModal)}
                    >
                        New Contract
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
                                        const {id, student, room, startDate, endDate, pricePerMonth,status} = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                            >
                                                <TableCell>{index}</TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {student.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{room.name}</TableCell>
                                                <TableCell align="left">{startDate}</TableCell>
                                                <TableCell align="left">{endDate}</TableCell>
                                                <TableCell align="left">{pricePerMonth}</TableCell>
                                                <TableCell align="left">{status}</TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Button variant="contained" onClick={() => setOpenUpdateModal(true)}>Edit</Button>
                                                        <Button variant="contained">Delete</Button>
                                                        <Button variant="contained" onClick={() => navigate('/dashboard/invoices')}>View Invoice</Button>
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
