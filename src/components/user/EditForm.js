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
import ReactSelect from "react-select";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
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
    username: yup.string().required('User is required').max(100, 'Max length is 100 characters'),
    full_name: yup.string().required('Full name is required').max(100, 'Max length is 100 characters'),
    new_password: yup.string().min(6, 'Min length is 6').max(20, 'Max length is 20 characters'),
    address: yup.string().required('Address is required').max(500, 'Max length is 500 characters'),
    student_school: yup.string().max(500, 'Max length is 500 characters'),
    student_year: yup.number().typeError('Student year is positive number').min(0, 'Min is 0'),
    account_status: yup.object().typeError('Account status is required').required('Account status is required'),
}).required();

export default function EditForm({initialValue, isOpenUpdateModal, setIsOpenUpdateModal, reLoad, setReLoad}) {
    const [noti, setNoti] = useState();
    const [openNoti, setOpenNoti] = useState(false);

    const {handleSubmit, control, formState:{ errors }} = useForm({
        defaultValues: {
            username: initialValue.username,
            full_name: initialValue.full_name,
            address: initialValue.address,
            account_status: { value: initialValue.account_status, label: initialValue.account_status },
            student_year: initialValue.student_year,
            student_school: initialValue.student_school,
            id: initialValue.id
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const model = {
            id: initialValue.id,
            password: data.new_password,
            full_name: data.full_name,
            address: data.address,
            account_status: data.account_status.value,
            student_year: parseInt(data.student_year, 10),
            student_school: data.student_school,
            role: initialValue.role
        }
        fetch(API.updateUser, {
            method: 'PATCH',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            }
        }).then((res) => res.json())
            .then((res) => {
                setNoti(res);
                setOpenNoti(true);
                setIsOpenUpdateModal(-1);
                setReLoad(!reLoad);
            });
    };

    return (
        <>
            <form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Modal
                        open={isOpenUpdateModal === initialValue.id}
                        onClose={() => setIsOpenUpdateModal(-1)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack direction="column" spacing={4}>
                                <h2>Update User</h2>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input username" disabled/>
                                    )}
                                />
                                <Controller
                                    name="full_name"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input full name"
                                                   error={Boolean(errors.full_name)} helperText={errors.full_name?.message}/>
                                    )}
                                />
                                <Controller
                                    name="new_password"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth type="password" onChange={onChange} value={value}
                                                   label="Input new password (default: don't change password)"
                                                   error={Boolean(errors.password)} helperText={errors.password?.message}/>
                                    )}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value} label="Input address"
                                                   error={Boolean(errors.address)} helperText={errors.address?.message}/>
                                    )}
                                />
                                <Controller
                                    name="account_status"
                                    control={control}
                                    render={({ field }) => <ReactSelect
                                        {...field}
                                        options={[
                                            { value: "active", label: "active" },
                                            { value: "inactive", label: "inactive" }
                                        ]}
                                        placeholder="Input account status"
                                    />}
                                />
                                <Controller
                                    name="student_school"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input student school"
                                                   error={Boolean(errors.student_school)} helperText={errors.student_school?.message}/>
                                    )}
                                />
                                <Controller
                                    name="student_year"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField fullWidth onChange={onChange} value={value}
                                                   label="Input student year"
                                                   error={Boolean(errors.student_year)} helperText={errors.student_year?.message}/>
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
                    {noti}
                </Alert>
            </Snackbar>
        </>
    );
}
