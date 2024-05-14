import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/appSlice";
import {authAPI, LoginParamsType} from "features/auth/api/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, thunkTryCatch} from "common/utils";
import {ResultCode} from "common/enums";

const login = createAppAsyncThunk<any, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
        const res = await authAPI.login(arg);
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else if (res.data.resultCode === 10) {
            return dispatch(captcha())
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data);
        }
});


const captcha = createAppAsyncThunk("app/getCaptcha", async () => {
        const res = await authAPI.getCaptchaUrl();
        return res
})


const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodolists());
            return {isLoggedIn: false};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            return rejectWithValue(res.data);
        }
    }).finally(() => {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    });
});



const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        captcha: " "
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(captcha.fulfilled, (state, action) => {
            console.log(action)
            state.captcha = action.payload.url
        })
        // builder
        // .addCase(login.fulfilled, (state, action) => {
        //   state.isLoggedIn = action.payload.isLoggedIn;
        // })
        // .addCase(logout.fulfilled, (state, action) => {
        //   state.isLoggedIn = action.payload.isLoggedIn;
        // })
        // .addCase(initializeApp.fulfilled, (state, action) => {
        //   state.isLoggedIn = action.payload.isLoggedIn;
        // })
        // builder.addMatcher((action: UnknownAction) => {
        //     if (
        //         action.type === "auth/login/fulfilled" ||
        //         action.type === "auth/logout/fulfilled" ||
        //         action.type === "app/initializeApp/fulfilled"
        //     ) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }, (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
        //       state.isLoggedIn = action.payload.isLoggedIn
        // })
        // Рефакторим ниже:
        builder.addMatcher(
            isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
            (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
});

export const authSlice = slice.reducer;
export const authThunks = {login, logout, initializeApp };
