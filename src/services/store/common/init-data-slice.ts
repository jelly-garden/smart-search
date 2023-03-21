import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Menu } from "../../../views/components/common";

export interface CheckLoginResult {
    gid: string;
    uid: string;
    user_account: string;
    user_name: string;
    mobile_num?: string;
}

export interface InitDataState {
    loginUserInfo?: CheckLoginResult;
    authMenus: Menu[];
}

const initialState: InitDataState = {
    authMenus: [],
};

export const initDataSlice = createSlice({
    name: "initData",
    initialState: initialState,
    reducers: {
        setStoredLoginUserInfo: (state, action: PayloadAction<CheckLoginResult>) => {
            state.loginUserInfo = action.payload;
        },
        setStoredInitData: (state, action: PayloadAction<InitDataState>) => {
            state.authMenus = action.payload.authMenus;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});
export const { setStoredLoginUserInfo, setStoredInitData } = initDataSlice.actions;

export default initDataSlice.reducer;
