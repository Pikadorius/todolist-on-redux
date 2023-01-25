import React from 'react';
import './App.css';
import ButtonAppBar from '../common/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import {useAppSelector} from '../../redux/store';
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from './appReducer';
import { Outlet} from 'react-router-dom';

//for storybook (if demo = true use initialState in storybook instead of loading from server)
type AppType = {
    demo?: boolean
}

const App: React.FC<AppType> = ({demo = false}) => {
    console.log('AppWithRedux rendering...')

    const status: RequestStatusType = useAppSelector(state => state.app.status)


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

