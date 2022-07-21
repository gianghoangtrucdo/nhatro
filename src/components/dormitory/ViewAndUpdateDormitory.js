import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Data from '../../_mock/doms';
import ShopProductCard from "../../sections/@dashboard/products/ProductCard";
import {Container, Grid} from "@mui/material";
import Page from "../Page";
import Rooms from "../../pages/Rooms";
import {getDom} from "../../connector/fetch";

const ViewAndUpdateDormitory = () => {
    const {id} = useParams();
    const [dom, setDom] = useState(undefined);

    useEffect(() => {
        (async function () {
            const dom = await getDom(id)
            setDom(dom);
        })()
    }, [])

    return dom !== undefined && (
        <Page title="Dashboard: Products">
            <Container>
                <Grid container rowSpacing={10}>
                    <Grid key={dom?.id} item xs={12} sm={6} md={3}>
                        <ShopProductCard product={dom}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Rooms rooms={dom?.rooms}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
};

export default ViewAndUpdateDormitory;
