import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getProfile, HttpError} from '../service/api.ts'
import {useAppSelector} from './hooks.ts'
import {UserInfos} from '../types'

type UserState = {
    userInfos: UserInfos | null
    loading: boolean
    error: string | undefined
}

export const fetchUserInfos = createAsyncThunk<UserInfos, void, { rejectValue: { message: string } }>('fetchUserInfos', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState()
        return getProfile(state.auth.userToken)
    } catch (e: any) {
        let { message } = e

        if (e instanceof HttpError && e.statusCode === 401) {
            message = 'Unauthorized action'
        }

        return thunkAPI.rejectWithValue({ message })
    }
})

const initialState = {
    userInfos: null,
    loading: false,
    error: undefined
} as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfos.pending, (state) => {
                state.error = undefined
                state.loading = true
            })
            .addCase(fetchUserInfos.fulfilled, (state, action) => {
                state.loading = false
                state.userInfos = action.payload
            })
            .addCase(fetchUserInfos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.userInfos = null
            })
    }
})

export const {} = userSlice.actions
export const useUserSelector = () => useAppSelector(state => state.user)
export default userSlice.reducer