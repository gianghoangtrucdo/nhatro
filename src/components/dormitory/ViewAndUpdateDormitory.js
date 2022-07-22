import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ShopProductCard from "../../sections/@dashboard/products/ProductCard";
import {Container, Grid} from "@mui/material";
import Page from "../Page";
import Rooms from "./Rooms";
import {getDom} from "../../connector/fetch";

const ViewAndUpdateDormitory = () => {
    const {id} = useParams();
    const [dom, setDom] = useState(undefined);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const {json, logData} = await getDom(id);
            if (logData.status === 401) {
                navigate('/');
            }
            setDom(json);
        })()
    }, [reload]);

    return dom !== undefined && (
        <Page title="Dashboard: Products">
            <Container>
                <Grid container rowSpacing={10}>
                    <Grid key={dom?.id} item xs={12} sm={6} md={3}>
                        <ShopProductCard
                            product={dom}
                            reload={reload}
                            setReload={setReload}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Rooms />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
};

export default ViewAndUpdateDormitory;
