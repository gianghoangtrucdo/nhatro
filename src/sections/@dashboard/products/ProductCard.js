import PropTypes from 'prop-types';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {Box, Card, Link, Typography, Stack, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
// components
import Label from '../../../components/Label';
import {ColorPreview} from '../../../components/color-utils';
import palette from "../../../theme/palette";

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object,
};

export default function ShopProductCard({product}) {
    const {id, name, cover, nb_room, address, status, host} = product;
    const hostName = host.user?.full_name;
    const navigate = useNavigate();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const randomPhoto = () => {
        const index = getRandomInt(1, 10);
        const path = `/static/mock-images/doms/dom_${index}.jpeg`
        return path;
    }

    return (
        <Card>
            <Box sx={{pt: '100%', position: 'relative'}}>
                {status && (
                    <Label
                        variant="filled"
                        color={(status === 'sale' && 'error') || 'info'}
                        sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase',
                        }}
                    >
                        {status}
                    </Label>
                )}
                <ProductImgStyle alt={name} src={randomPhoto()}/>
            </Box>

            <Stack spacing={2} sx={{p: 3}}>
                <Link to={"/dashboard/dom/" + id} underline="hover" component={RouterLink} underline="always">
                    <Typography variant="h5">
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">
                        Hostname:
                        <Typography variant="subtitle2">
                            {hostName}
                        </Typography>
                    </Typography>
                    <Typography variant="body2">
                        Room:
                        <Typography variant="subtitle2">
                            {nb_room}
                        </Typography>
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">
                        Address:
                        <Typography variant="subtitle2">
                            {address}
                        </Typography>
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={() => setOpenUpdateModal(true)}>Edit</Button>
                    <Button variant="contained">Delete</Button>
                    <Button variant="contained" onClick={() => navigate('/dashboard/dom/' + id)}>Detail</Button>
                </Stack>
            </Stack>
        </Card>
    );
}
