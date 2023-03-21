/**
 * 공용, redux slice 정의 파일
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { THEME_DARK, THEME_MODE } from "../../interfaces";

export interface CommonState {
    activeAppPath: string;
    locale: string;
    themeMode: THEME_MODE;
    pageLoading: boolean;
}

const initialState: CommonState = {
    activeAppPath: process.env.REACT_APP_URL,
    locale: sessionStorage.getItem("currentLang") ? String(sessionStorage.getItem("currentLang")) : "ko",
    themeMode: THEME_DARK,
    pageLoading: false,
};

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setStoredActiveApp: (state, action: PayloadAction<string>) => {
            state.activeAppPath = action.payload;
        },
        setStoredLocale: (state, action: PayloadAction<string>) => {
            state.locale = action.payload;
            sessionStorage.setItem("currentLang", action.payload);
        },
        setStoredThemeMode: (state, action: PayloadAction<THEME_MODE>) => {
            state.themeMode = action.payload;
        },
        setStoredPageLoading: (state, action: PayloadAction<boolean>) => {
            state.pageLoading = action.payload;
        },
    },
});

export const { setStoredLocale, setStoredActiveApp, setStoredThemeMode, setStoredPageLoading } = commonSlice.actions;

export default commonSlice.reducer;
