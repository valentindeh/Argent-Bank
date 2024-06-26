import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getProfile, updateProfile} from '../service/api.ts'
import {useAppSelector} from './hooks.ts'
import {UserInfos, UsernameUpdate} from '../types'
import {RootState} from './index.ts'
import {logout} from './authSlice.ts'

type UserState = {
    userInfos: UserInfos | null
    loading: boolean
    error: string | undefined
}

export const fetchUserInfos = createAsyncThunk<UserInfos, void, {
    rejectValue: { message: string },
    state: RootState
}>('fetchUserInfos', async (_, {rejectWithValue}) => {
    try {
        return await getProfile()
    } catch (e: any) {
        const {message} = e
        return rejectWithValue({message})
    }
})

export const updateUserInfos = createAsyncThunk<UserInfos, UsernameUpdate, {
    rejectValue: { message: string },
    state: RootState
}>("updateProfile", async (data, {rejectWithValue}) => {
        try {
            return await updateProfile(data)
        } catch (e: any) {
            const {message} = e
            return rejectWithValue({message})
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfos: null,
        loading: false,
        error: undefined
    } as UserState,
    reducers: {},
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
            .addCase(fetchUserInfos.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload?.message
                state.userInfos = null
            })
            .addCase(updateUserInfos.pending, (state) => {
                state.error = undefined
                state.loading = true
            })
            .addCase(updateUserInfos.fulfilled, (state, {payload}) => {
                state.loading = false
                state.userInfos = payload
            })
            .addCase(updateUserInfos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message
                state.userInfos = null
            })
            .addCase(logout, (state) => {
                state.userInfos = null
            })
    }
})

export const useUserSelector = () => useAppSelector(state => state.user)
export default userSlice.reducer