import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {HttpError, LoginData, signIn} from '../service/api.ts'
import {useAppSelector} from './hooks.ts'

type LoginCredentials = {
    username: string
    password: string
    rememberMe: boolean
}

type AuthApiState = {
    userToken: string | null
    loading: boolean
    error: string | undefined
}

export const login = createAsyncThunk<LoginData, LoginCredentials, { rejectValue: { message: string } }>('login', async (data, thunkAPI) => {
    const {username, password, rememberMe} = data
    try {
        const res = await signIn(username, password)

        if (rememberMe) {
            sessionStorage.setItem('token', res.token)
        } else {
            localStorage.setItem('token', res.token)
        }

        return res
    } catch (e: any) {
        let { message } = e

        if (e instanceof HttpError && e.statusCode === 400) {
            message = 'Invalid credentials'
        }

        return thunkAPI.rejectWithValue({ message })
    }
})

const initialState = {
    userToken: sessionStorage.getItem('token') ?? localStorage.getItem('token') ?? null,
    loading: false,
    error: undefined
} as AuthApiState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            sessionStorage.clear()
            localStorage.clear()
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.error = undefined
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.userToken = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export const {logout} = authSlice.actions
export const useAuthSelector = () => useAppSelector(state => state.auth)
export default authSlice.reducer