import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikValues, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {loginTC} from './authReducer';
import {Navigate} from 'react-router-dom';

export const Login = () => {

    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        validate: (values)=>{
            const errors = {} as FormikValues;
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField  label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.errors.email? <div>{formik.errors.email}</div> : null}

                        <TextField type="password" label="Password" {...formik.getFieldProps('password')}
                                   margin="normal"
                        />
                        {formik.errors.password? <div>{formik.errors.password}</div> : null}

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}