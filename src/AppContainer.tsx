import App from './App';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootState} from './redux/store';

type MapStateType = {
    state: AppRootState
}
const mapStateToProps = (state:AppRootState) => {
    return {
        state:state
    }
}

type MapDispacthType = {
    dispatch: Dispatch
}
const mapDispacthToProps = (dispatch: Dispatch) => {
    return {
        dispatch: dispatch
    }
}
export type AppType = MapStateType & MapDispacthType
export const AppContainer = connect(mapStateToProps, mapDispacthToProps)(App)

export default AppContainer;
