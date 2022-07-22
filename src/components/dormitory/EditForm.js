import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
// mui
import {Alert, Button, TextField} from '@mui/material';
import ReactSelect from "react-select";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Snackbar from '@mui/material/Snackbar';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as API from '../../constants/index';
import {getHosts} from "../../connector/fetch";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const schema = yup.object({
    name: yup.string().required('Dormitory name is required').max(500, 'Max length is 500 characters'),
    address: yup.string().required('Dormitory address is required').max(500, 'Max length is 500 characters'),
    nb_room: yup.number().positive().integer().required('Number room is required'),
}).required();

export default function EditForm({item, openModal, setOpenModal, reLoad, setReLoad}) {
    const [isOpen, setOpen] = useState(false);
    const [hosts, setHosts] = useState([]);

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            name: item.name,
            nb_room: item.nb_room,
            address: item.address
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        (async function () {
            const {json, logData} = await getHosts(0, 50);
            if (logData.status === 200) {
                const mappedHosts = json.map(element => ({
                    value: element.id, label: element.user?.full_name,
                }))
                setHosts(mappedHosts);
            }
        })()
    }, []);

    const onSubmit = (data) => {
        const model = {
            name: data.name,
            address: data.address,
            nb_room: data.nb_room,
            host_id: data.host.value,
            dom_id: item.id
        }
        fetch(API.updateDom, {
            method: 'PATCH',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            }
        }).then((res) => res.json())
            .then((res) => {
                setOpen(true);
                setOpenModal(false);
                setReLoad(!reLoad);
            });
    };

    return (
        <Box sx={{ width: '100%', height: '100%'}}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="column" spacing={4}>
                                <h2>Edit Dormitory</h2>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input dormitory name"
                                                   error={Boolean(errors.name)}
                                                   helperText={errors.name?.message}/>)}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input address"
                                                   error={Boolean(errors.address)}
                                                   helperText={errors.address?.message}/>)}
                                />
                                <Controller
                                    name="nb_room"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input room (number: 1,2,3,...)"
                                                   error={Boolean(errors.nb_room)}
                                                   helperText={errors.nb_room?.message}/>)}
                                />
                                <section>Choose host</section>
                                <Controller
                                    name="host"
                                    control={control}
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={hosts}
                                    />}
                                />
                                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                                    Submit
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </LocalizationProvider>
            </form>

            <Snackbar sx={{position: 'inherit'}} open={isOpen} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success"
                       sx={{width: '100%', background: '#4caf50', color: '#fff'}}>
                    Update successfully
                </Alert>
            </Snackbar>
        </Box>
    );
}
