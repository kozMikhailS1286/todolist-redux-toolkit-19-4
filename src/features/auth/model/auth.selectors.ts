import { AppRootStateType } from "app/store";
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const captcha = (state: AppRootStateType) => state.auth.captcha