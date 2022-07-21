import {filter} from 'lodash';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
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
import Page from '../Page';
import Scrollbar from '../Scrollbar';
import Iconify from '../Iconify';
import {UserListHead} from '../../sections/@dashboard/user';
import CreateRoomModal from "../room/CreateRoomModal";
import UpdateRoomModal from "../room/UpdateRoomModal";
import {getRoomsByDomId} from "../../connector/fetch";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'no', label: 'No'},
    {id: 'name', label: 'Room name', alignRight: false},
    {id: 'maxStudent', label: 'Max student per room', alignRight: false},
    {id: 'option', label: 'Option', alignRight: false},
];

// ----------------------------------------------------------------------

export default function Rooms() {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listRooms, setListRooms] = useState([]);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const navigate = useNavigate();

    const [reLoad, setReLoad] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        (async function () {
            const rooms = await getRoomsByDomId(0, 50, id)
            setListRooms(rooms);
        })()
    }, [reLoad]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listRooms.length) : 0;

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
                                    headLabel={TABLE_HEAD}
                                    rowCount={listRooms.length}
                                    isShowHeadCheckbox={false}
                                />
                                <TableBody>
                                    {listRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const {ID, Name, MaxStudent} = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={ID}
                                                tabIndex={-1}
                                            >
                                                <TableCell>{index}</TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {Name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{MaxStudent}</TableCell>
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
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={listRooms.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <CreateRoomModal
                        domId={id}
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
