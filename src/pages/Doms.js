import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
// material
import {Button, Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import {ProductList, ProductCartWidget} from '../sections/@dashboard/products';
import CreateForm from "../components/dormitory/CreateForm";
import Iconify from "../components/Iconify";

import {getDoms} from "../connector/fetch";

const Doms = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [reLoad, setReLoad] = useState(false);
    const [doms, setDoms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const {json, logData} = await getDoms(0, 50)
            if (logData.status === 401) {
                navigate('/');
            }
            setDoms(json);
        })()
    }, [reLoad])

    return (<Page title="Dashboard: Dormitory">
        <Container>
            <Typography variant="h4" sx={{mb: 5}}>
                Dormitory
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:plus-fill"/>}
                    onClick={() => setOpenCreateModal(!openCreateModal)}
                >
                    New Dormitory
                </Button>
            </Stack>

            <ProductList products={doms} reload={reLoad} setReload={setReLoad}/>
            <ProductCartWidget/>

            <CreateForm
                openCreateModal={openCreateModal}
                setOpenCreateModal={setOpenCreateModal}
                reLoad={reLoad}
                setReLoad={setReLoad}/>
        </Container>
    </Page>);
};

export default Doms;
