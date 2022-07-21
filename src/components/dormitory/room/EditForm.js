import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
// mui
import {Alert, Button, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Snackbar from '@mui/material/Snackbar';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as API from '../../../constants/index';

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
    name: yup.string().required().max(500, 'Max length is 500 characters'),
    max_student: yup.number().positive().integer(),
}).required();

export default function EditForm({domId, room, openUpdateModal, setOpenUpdateModal, reLoad, setReLoad}) {
    const [openNoti, setOpenNoti] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            name: room.Name,
            max_student: room.MaxStudent
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const model = {
            name: data.name,
            maxStudent: data.max_student,
            domID: parseInt(domId, 10),
            room_id: room.ID
        }
        fetch(API.updateRoom, {
            method: 'PATCH',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => res.json())
            .then((res) => {
                setOpenNoti(true);
                setOpenUpdateModal(-1);
                setReLoad(!reLoad);
            });
    };

    return (
        <>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={openUpdateModal === room.ID}
                        onClose={() => setOpenUpdateModal(-1)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="column" spacing={4}>
                                <h2>Edit Room</h2>
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
            }} open={openNoti} autoHideDuration={6000} onClose={() => setOpenNoti(false)}>
                <Alert onClose={() => setOpenNoti(false)} severity="success"
                       sx={{width: '100%', background: '#4caf50', color: '#fff'}}>
                    Update successfully
                </Alert>
            </Snackbar>
        </>
    );
}
