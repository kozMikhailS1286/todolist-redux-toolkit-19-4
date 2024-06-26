import {createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import {todolistsThunks} from "../features/TodolistsList/model/todolists/todolists.reducer";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
    extraReducers: (builder) => {
        // builder.addMatcher((action: UnknownAction) => {
        //         return action.type.endsWith('/pending');
        //     },
        //     (state, action) => {
        //         state.status = "loading"
        //     })
        // Рефакторим ниже:
        builder.addMatcher(isPending(),
            (state, action) => {
                state.status = "loading"
            })
        // builder.addMatcher((action: UnknownAction) => {
        //     return action.type.endsWith('/rejected');
        // },
        //     (state, action) => {
        //     state.status = "failed"
        // })
        // Рефакторим ниже:
        builder.addMatcher(isRejected(),
            (state, action: any) => {
                // state.error = action.error.message
                state.status = "failed"
                if (action.payload) {
                    // 2 variant (предпочтительный)
                    if (action.type === todolistsThunks.addTodolist.rejected.type) return;
                    state.error = action.payload.messages[0]
                } else {
                    state.error = action.error.message ? action.error.message : 'Some error occurred'
                }

            })
        // builder.addMatcher((action: UnknownAction) => {
        //     return action.type.endsWith('/fulfilled');
        // },
        //     (state, action) => {
        //     state.status = "succeeded"
        // })
        // Рефакторим ниже:
        builder.addMatcher(isFulfilled(),
            (state, action) => {
                state.status = "succeeded"
            })
    }
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
