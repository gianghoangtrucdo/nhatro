import { useState } from 'react';
import {Link as RouterLink} from "react-router-dom";
// material
import {Button, Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import CreateNewDormitory from "../components/dormitory/CreateNewDormitory";
import Iconify from "../components/Iconify";
// mock
import Data from '../_mock/doms';

const Doms = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [reLoad, setReLoad] = useState(false);

    return (
        <Page title="Dashboard: Products">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Dormitory
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => setOpenCreateModal(!openCreateModal)}
                    >
                        New Dormitory
                    </Button>
                </Stack>

                <ProductList products={Data} />
                <ProductCartWidget />

                <CreateNewDormitory
                    openCreateModal={openCreateModal}
                    setOpenCreateModal={setOpenCreateModal}
                    reLoad={reLoad}
                    setReLoad={setReLoad} />
            </Container>
        </Page>
    );
};

export default Doms;