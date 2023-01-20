import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {AppRootState, useAppDispatch, useAppSelector} from '../../../redux/store';
import {setAppErrorAC} from '../../App/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const [open, setOpen] = React.useState(true);

    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    const isOpen = error !== null


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        } else {
            dispatch(setAppErrorAC(null))
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            {/*<Button variant="outlined" onClick={handleClick}>
                Open error snackbar
            </Button>*/}
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}