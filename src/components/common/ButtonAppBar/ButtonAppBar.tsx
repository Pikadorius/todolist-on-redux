import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {logoutTC} from '../../Features/Login/authReducer';

export default function ButtonAppBar() {

    const isLogged = useAppSelector(state => state.auth.isLoggedIn)
    const nickname = useAppSelector(state => state.auth.login)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    {isLogged ? <div>
                        <div>{nickname}</div>
                        <Button color="inherit" onClick={logout}>Logout</Button></div> : <Button color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}