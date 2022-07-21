import { filter } from 'lodash';
import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    TablePagination,
} from '@mui/material';
// components
import * as API from '../constants/index';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user';
import CreateForm from "../components/user/CreateForm";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'username', label: 'Username', alignRight: false },
    { id: 'fullName', label: 'Full Name', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'dob', label: 'Date Of Birth', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'school', label: 'School Name', alignRight: false },
    { id: 'year', label: 'School Year', alignRight: false },
    { id: 'accountStatus', label: 'Account Status', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function User() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [listUsers, setListUsers] = useState(undefined);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [reLoad, setReLoad] = useState(false);

    useEffect(() => {
        fetch(API.users)
            .then(res => res.json())
            .then((res) => {
                setListUsers(res);
            });
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUsers?.length) : 0;

    return listUsers !== undefined && (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => setOpenCreateModal(!openCreateModal)}
                    >
                        New User
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listUsers.length}
                                    onRequestSort={handleRequestSort}
                                    isShowHeadCheckbox={false}
                                />
                                <TableBody>
                                    {listUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { account_status, address, dob, full_name, id, role, username, student_school, student_year } = row;;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={username} src={username} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {username}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{full_name}</TableCell>
                                                <TableCell align="left">{address}</TableCell>
                                                <TableCell align="left">{dob}</TableCell>
                                                <TableCell align="left">{role}</TableCell>
                                                <TableCell align="left">{student_school}</TableCell>
                                                <TableCell align="left">{student_year}</TableCell>
                                                <TableCell align="left">{account_status}</TableCell>
                                                <TableCell align="right">
                                                    <UserMoreMenu row={row} reLoad={reLoad} setReLoad={setReLoad} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {listUsers?.length === 0 && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={listUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <CreateForm
                        openCreateModal={openCreateModal}
                        setOpenCreateModal={setOpenCreateModal}
                        reLoad={reLoad}
                        setReLoad={setReLoad} />
                </Card>
            </Container>
        </Page>
    );
}
