import {AppDispatchType} from '../redux/store';
import {setAppErrorAC, setAppStatusAC} from '../components/App/appReducer';
import {changeTodolistEntityStatus} from '../components/Features/Todolists/todolistsReducer';
import {ResponseType} from '../API/API'

export const handleAppError = <D>(dispatch: AppDispatchType,todolistId: string, res:ResponseType<D>) => {
    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occured"))
    }
    dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (dispatch: AppDispatchType, e:any) => {
    const error = e.message ? e.message : "Some error occured"
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'))
}