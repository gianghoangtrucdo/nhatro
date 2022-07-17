import {useParams} from "react-router-dom";
import Data from '../../_mock/doms';
import ShopProductCard from "../../sections/@dashboard/products/ProductCard";
import {Container, Grid} from "@mui/material";
import Page from "../Page";
import Rooms from "../../pages/Rooms";

const ViewAndUpdateDormitory = () => {
    const {id} = useParams();
    const data = Data[id];

    return (
        <Page title="Dashboard: Products">
            <Container>
                <Grid container rowSpacing={10}>
                    <Grid key={data.host_id} item xs={12} sm={6} md={3}>
                        <ShopProductCard product={data}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Rooms/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
};

export default ViewAndUpdateDormitory;