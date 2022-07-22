import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
// mui
import {Alert, Button, TextField} from '@mui/material';
import ReactSelect from "react-select";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Snackbar from '@mui/material/Snackbar';
import * as API from '../../constants/index';
// imports
import {DesktopDatePicker} from "@mui/lab";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
};

const schema = yup.object({
    student: yup.object().typeError('Student is required').required('Student is required'),
    room: yup.object().typeError('Room is required').required('Room is required'),
    start_date: yup.date().typeError('Start date is required').required('Start date is required'),
    end_date: yup.date().typeError('End date is required').required('End date is required'),
    price_per_month: yup.number().typeError('Price per month is positive number').min(0, 'Min is 0').required('Price is required'),
    status: yup.string().required('Status is required'),
}).required();

export default function CreateForm({rooms, students, openCreateModal, setOpenCreateModal, reLoad, setReLoad}) {
    const [isOpen, setOpen] = useState(false);

    const {handleSubmit, control, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const model = {
            student_id: data.student.value,
            room_id: data.room.value,
            start_date: data.start_date,
            end_date: data.end_date,
            price_per_month: parseInt(data.price_per_month, 10),
            status: data.status
        }
        fetch(API.createContract, {
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
                reset();
                setReLoad(!reLoad);
            });
    };

    return (
        <>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={openCreateModal}
                        onClose={() => {
                            setOpenCreateModal(false);
                            reset();
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="column" spacing={4}>
                                <h2>Create new Contract</h2>
                                <section>Choose room</section>
                                <Controller
                                    name="room"
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={rooms}
                                    />}
                                />
                                {Boolean(errors.room) && <Alert variant="filled" severity="error">
                                    {errors.room?.message}
                                </Alert>}
                                <section>Choose student</section>
                                <Controller
                                    name="student"
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={students}
                                    />}
                                />
                                {Boolean(errors.student) && <Alert variant="filled" severity="error">
                                    {errors.student?.message}
                                </Alert>}
                                <section>Choose start date</section>
                                <Controller
                                    control={control}
                                    name="start_date"
                                    defaultValue={null}
                                    render={({field: {onChange, value}}) => (
                                        <DesktopDatePicker
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField {...params} fullWidth/>}
                                        />
                                    )}
                                />
                                {Boolean(errors.start_date) && <Alert variant="filled" severity="error">
                                    {errors.start_date?.message}
                                </Alert>}
                                <section>Choose end date</section>
                                <Controller
                                    control={control}
                                    name="end_date"
                                    defaultValue={null}
                                    render={({field: {onChange, value}}) => (
                                        <DesktopDatePicker
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField {...params} fullWidth/>}
                                        />
                                    )}
                                />
                                {Boolean(errors.end_date) && <Alert variant="filled" severity="error">
                                    {errors.end_date?.message}
                                </Alert>}
                                <section>Input status</section>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input status"
                                                   error={Boolean(errors.status)}
                                                   helperText={errors.status?.message}/>
                                    )}
                                />
                                <section>Choose price per month</section>
                                <Controller
                                    name="price_per_month"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input price per month (Unit: 100,000VND)"
                                                   error={Boolean(errors.price_per_month)}
                                                   helperText={errors.price_per_month?.message}/>
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
            }} open={isOpen} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success"
                       sx={{width: '100%', background: '#4caf50', color: '#fff'}}>
                    Create successfully
                </Alert>
            </Snackbar>
        </>
    );
}
