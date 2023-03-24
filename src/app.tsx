import React, { useEffect, useState } from "react";

import "./i18n/i18n";

import moment from "moment";
import { ThemeProvider } from "styled-components";

import { THEME_LIGHT } from "./services/interfaces";
import { CommonState } from "./services/store/common/common-slice";
import { setStoredInitData } from "./services/store/common/init-data-slice";
import { useAppDispatch, useAppSelector } from "./services/store/hooks";
import { GlobalFonts, GlobalOverrideStyle, GlobalStyle, themeDark, themeLight } from "./styles";
import { LoadingSpinner, MENUS } from "./views/components/common";
import { Layout } from "./views/layouts";

import "./styles.scss";

const App = (): JSX.Element => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { locale, themeMode } = storedCommon;

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @private
     * @description [useEffect hooks] 다국어 변경 처리
     */
    useEffect(() => {
        if (locale) {
            moment.locale(locale);
        }
    }, [locale]);

    /**
     * @private
     * @description [useEffect hooks] 공통 데이터 저장
     */
    useEffect(() => {
        dispatch(
            setStoredInitData({
                authMenus: MENUS,
            })
        );
        setLoading(false);
    }, [dispatch]);

    return (
        <ThemeProvider theme={themeMode === THEME_LIGHT ? themeLight : themeDark}>
            {!loading ? (
                <>
                    <GlobalStyle />
                    <GlobalFonts />
                    <GlobalOverrideStyle />
                    <Layout />
                </>
            ) : (
                <LoadingSpinner />
            )}
        </ThemeProvider>
    );
};

export default App;
