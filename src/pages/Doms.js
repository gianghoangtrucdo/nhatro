import { useState } from 'react';
// material
import {Button, Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import Data from '../_mock/doms';
import {Link as RouterLink} from "react-router-dom";
import Iconify from "../components/Iconify";
import CreateNewDormitory from "../components/dormitory/CreateNewDormitory";

const Doms = () => {
    const [openFilter, setOpenFilter] = useState(false);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [reLoad, setReLoad] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Page title="Dashboard: Products">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Dormitory
                </Typography>

                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            isOpenFilter={openFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

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