import * as Yup from 'yup';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {Controller, form, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Stack, IconButton, InputAdornment, Button, TextField, Alert} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
// components
import Iconify from '../../../components/Iconify';
import * as API from "../../../constants";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [type, setType] = useState("error");

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = (data) => {
        const model = {
            username: data.username,
            password: data.password
        }
        fetch(API.login, {
            method: 'POST',
            body: JSON.stringify(model),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            if (res.status !== 200) {
                setMessage("Login fail")
                setOpen(true);
                setType("error")
            } else {
                return res.json()
            }
        })
            .then((res) => {
                localStorage.setItem("ACCESS_TOKEN", res.access_token);
                navigate('/dashboard/doms')
            });
    };

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(LoginSchema)
    });

    return (
        <>
            <form>
                <Stack spacing={3}>
                    <Controller
                        name="username"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField fullWidth onChange={onChange} value={value} label="Input username"
                                       error={Boolean(errors.username)}
                                       helperText={errors.username?.message}/>
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField fullWidth
                                       onChange={onChange}
                                       value={value}
                                       label="Input email"
                                       type={showPassword ? 'text' : 'password'}
                                       error={Boolean(errors.password)}
                                       helperText={errors.password?.message}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton onClick={() => setShowPassword(!showPassword)}
                                                               edge="end">
                                                       <Iconify
                                                           icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                            />
                        )}
                    />
                </Stack>

                <Button fullWidth size="large" type="submit" variant="contained" sx={{mt: 2}}
                        onClick={handleSubmit(onSubmit)}>
                    Login
                </Button>
            </form>

            <Snackbar sx={{
                width: '40%', position: 'absolute', top: '0%', left: '0%',
            }} open={isOpen} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={type}
                       sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}
