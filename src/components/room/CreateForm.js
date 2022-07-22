import React, {useState} from 'react';
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
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";

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
    name: yup.string().required('Room name is required').max(500, 'Max length is 500 characters'),
    max_student: yup.number().typeError('Maximum student is positive number').min(0, 'Min is 0'),
    dom: yup.object().typeError('Dormitory is required').required('Dormitory is required')
}).required();

export default function CreateForm({doms, openCreateModal, setOpenCreateModal, reLoad, setReLoad}) {
    const [isOpen, setOpen] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const model = {
            name: data.name,
            maxStudent: data.max_student,
            domID: data.dom.value
        }
        fetch(API.createRoom, {
            method: 'POST',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            }
        }).then((res) => res.json())
            .then((res) => {
                setOpen(true);
                setOpenCreateModal(false);
                setReLoad(!reLoad);
            });
    };

    return (
        <>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={openCreateModal}
                        onClose={() => setOpenCreateModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="column" spacing={4}>
                                <h2>Create new Room</h2>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input room name"
                                                   error={Boolean(errors.name)}
                                                   helperText={errors.name?.message}/>
                                    )}
                                />
                                <Controller
                                    name="max_student"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input max student per room (number)"
                                                   error={Boolean(errors.max_student)}
                                                   helperText={errors.max_student?.message}/>
                                    )}
                                />
                                <section>Choose domitory</section>
                                <Controller
                                    name="dom"
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={doms}
                                    />}
                                />
                                {Boolean(errors.dom) && <Alert variant="filled" severity="error">
                                    {errors.dom?.message}
                                </Alert>}
                                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                                    Submit
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </LocalizationProvider>
            </form>

            <Snackbar sx={{
                width: '40%',
                position: 'absolute',
                top: '0%',
                left: '0%',
            }} open={isOpen} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success"
                       sx={{width: '100%', background: '#4caf50', color: '#fff'}}>
                    Create successfully
                </Alert>
            </Snackbar>
        </>
    );
}
