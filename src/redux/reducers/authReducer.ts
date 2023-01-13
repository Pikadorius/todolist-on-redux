import {Dispatch} from 'redux';
import {authAPI} from '../../API/API';

export type InitialStatetype = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

const initialState = {} as InitialStatetype

export const authReducer = (state = initialState, action: AuthMeACType): InitialStatetype => {
    switch (action.type) {
        case 'AUTH_ME': {
            return {...state, ...action.payload.data, isAuth: true}
        }
        default:
            return state
    }
}

type AuthMeACType = ReturnType<typeof authMeAC>
export const authMeAC = (data: InitialStatetype) => {
    return {
        type: 'AUTH_ME',
        payload: {
            data
        }
    }
}

export type AuthTCType = () => void
export const authMe: AuthTCType = () => (dispatch: Dispatch) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            dispatch(authMeAC(data.data))
        }
    })
}