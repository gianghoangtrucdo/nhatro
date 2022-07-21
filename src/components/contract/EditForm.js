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
import {DesktopDatePicker} from "@mui/lab";
// imports
import * as API from '../../constants/index';

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

}).required();

export default function EditForm({item, rooms, students, openUpdateModal, setOpenUpdateModal, reLoad, setReLoad}) {
    const [isOpen, setOpen] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            student: {value: item.student.id, label: item.student.user.full_name},
            room: {value: item.room.ID, label: item.room.Name},
            start_date: item.start_date,
            end_date: item.end_date,
            price_per_month: item.price_per_month,
            status: item.status
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const model = {
            student_id: data.student.value,
            room_id: data.room.value,
            start_date: data.start_date,
            end_date: data.end_date,
            price_per_month: parseInt(data.price_per_month, 10),
            status: data.status,
            contract_id: item.id
        }
        fetch(API.updateContract, {
            method: 'PATCH',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            }
        }).then((res) => res.json())
            .then((res) => {
                setOpen(true);
                setOpenUpdateModal(-1);
                setReLoad(!reLoad);
            });
    };

    return (
        <>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={openUpdateModal === item.id}
                        onClose={() => setOpenUpdateModal(-1)}
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
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={rooms}
                                    />}
                                />
                                <section>Choose student</section>
                                <Controller
                                    name="student"
                                    control={control}
                                    render={({field}) => <ReactSelect
                                        {...field}
                                        options={students}
                                    />}
                                />
                                <section>Choose start date</section>
                                <Controller
                                    control={control}
                                    name="start_date"
                                    defaultValue={null}
                                    render={({ field: { onChange, value } }) => (
                                        <DesktopDatePicker
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}
                                />
                                <section>Choose end date</section>
                                <Controller
                                    control={control}
                                    name="end_date"
                                    defaultValue={null}
                                    render={({ field: { onChange, value } }) => (
                                        <DesktopDatePicker
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}
                                />
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
                                                   label="Input price per month"
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
