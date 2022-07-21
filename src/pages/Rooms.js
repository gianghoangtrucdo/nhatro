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
    TablePagination,
} from '@mui/material';
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import {UserListHead} from "../sections/@dashboard/user";
import CreateForm from "../components/room/CreateForm";
import EditForm from "../components/room/EditForm";
import {getDoms, getRooms} from "../connector/fetch";
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'no', label: 'No'},
    {id: 'name', label: 'Room name', alignRight: false},
    {id: 'doom', label: 'Doom name', alignRight: false},
    {id: 'maxStudent', label: 'Max student per room', alignRight: false},
    {id: 'option', label: 'Option', alignRight: false},
];

// ----------------------------------------------------------------------

export default function Rooms() {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listRooms, setListRooms] = useState([]);

    const [listDoms, setListDoms] = useState([]);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const navigate = useNavigate();

    const [reLoad, setReLoad] = useState(false);

    useEffect(() => {
        (async function () {
            const {json, logData} = await getRooms(0, 50);
            if (logData.status === 401) {
                navigate('/');
            }
            setListRooms(json);
        })()
    }, [reLoad]);

    useEffect(() => {
        (async function () {
            const doms = await getDoms(0, 50)
            const formatDoms = doms.map((el) => ({
                value: el.id, label: el.name
            }))
            setListDoms(formatDoms);
        })()
    }, []);

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
                                        const {ID, Name, MaxStudent, Dom} = row;
                                        const domName = Dom.name;

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
                                                <TableCell align="left">{domName}</TableCell>
                                                <TableCell align="left">{MaxStudent}</TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Button variant="contained" onClick={() => setOpenUpdateModal(ID)}>Edit</Button>
                                                        <Button variant="contained">Delete</Button>
                                                        <Button variant="contained" onClick={() => navigate('/dashboard/contracts')}>View Contract</Button>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <EditForm
                                                        room={row}
                                                        doms={listDoms}
                                                        openUpdateModal={openUpdateModal}
                                                        setOpenUpdateModal={setOpenUpdateModal}
                                                        reLoad={reLoad}
                                                        setReLoad={setReLoad}/>
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

                    <CreateForm
                        doms={listDoms}
                        openCreateModal={openCreateModal}
                        setOpenCreateModal={setOpenCreateModal}
                        reLoad={reLoad}
                        setReLoad={setReLoad}/>
                </Card>
            </Container>
        </Page>
    );
}
