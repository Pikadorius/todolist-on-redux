import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './appReducer';

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        status: 'idle',
        error: null
    }
})

test('correct error message should be setted', () => {
    const endState = appReducer(initialState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
    expect(initialState.error).toBeNull()
    expect(endState.status).toBe('idle')
})

test('correct status should be setted', () => {
    const endState = appReducer(initialState, setAppStatusAC('failed'))

    expect(endState.error).toBeNull()
    expect(initialState.error).toBeNull()
    expect(endState.status).toBe('failed')
    expect(initialState.status).toBe('idle')
})