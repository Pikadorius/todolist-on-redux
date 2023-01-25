import React, {useEffect, useLayoutEffect} from 'react';
import './App.css';
import ButtonAppBar from '../common/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import {Outlet} from 'react-router-dom';
import {authMe} from '../Features/Login/authReducer';

//for storybook (if demo = true use initialState in storybook instead of loading from server)
type AppType = {
    demo?: boolean
}

const App: React.FC<AppType> = ({demo = false}) => {
    console.log('AppWithRedux rendering...')

    const dispatch = useAppDispatch()

    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(authMe())
    }, [])


    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                {/*<Routes>
                        <Route path={'/'} element={<Todolists demo={demo} />}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>*/}
                <Outlet/>
                {/*<Todolists demo={demo}/>*/}
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

