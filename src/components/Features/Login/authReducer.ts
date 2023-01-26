import {authAPI, LoginResponseType, LoginType} from '../../../API/API';
import {setAppErrorAC, setAppStatusAC} from '../../App/appReducer';
import {AppDispatchType} from '../../../redux/store';
import {handleNetworkError} from '../../../Utils/utils';

export type LoginInitialStatetype = {
    id: number
    login: string
    email: string
    isLoggedIn: boolean
}

const initialState = {isLoggedIn: false} as LoginInitialStatetype

export const authReducer = (state = initialState, action: AuthMeACType | LoggedInType): LoginInitialStatetype => {
    switch (action.type) {
        case 'AUTH_ME': {
            return {...state, ...action.payload.data, isLoggedIn: true}
        }
        case 'login/SET_LOGGED_IN': {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }
        default:
            return state
    }
}

type AuthMeACType = ReturnType<typeof authMeAC>
export const authMeAC = (data: LoginResponseType) => {
    return {
        type: 'AUTH_ME',
        payload: {
            data
        }
    } as const
}

type LoggedInType = ReturnType<typeof loggedInAC>
export const loggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_LOGGED_IN',
        payload: {
            isLoggedIn
        }
    } as const
}

export const authMe = () => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        console.log(res)
        if (res.resultCode === 0) {
            dispatch(authMeAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(loggedInAC(false))
            dispatch(setAppErrorAC(res.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    })
}


/*export const loginTC2 = (data: LoginType) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.auth(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            console.log(res.data)
            dispatch(setAppErrorAC(res.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    }).catch(e => {
        handleNetworkError(dispatch, e)
    })
}*/

export const loginTC =  (data: LoginType) => async (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.auth(data)
        if (res.data.resultCode === 0) {
            dispatch(loggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            console.log(res.data)
            dispatch(setAppErrorAC(res.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleNetworkError(dispatch, e)
    }
}


export const logoutTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then(res=>{
        if (res.data.resultCode===0) {
            dispatch(loggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }
    })
}