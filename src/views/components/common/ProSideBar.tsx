/**
 * [공통컴포넌트] 메인프레임의 SideBar 컴포넌트
 */
import React, { useCallback, useEffect, useState } from "react";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import {
    ProSidebar,
    Menu as SidebarMenu,
    MenuItem as SidebarMenuItem,
    SubMenu as SidebarSubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../../assets/images/main-logo.png";
import { THEME_DARK, THEME_LIGHT, THEME_MODE } from "../../../services/interfaces";
import { CommonState, setStoredThemeMode } from "../../../services/store/common/common-slice";
import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";

import { Menu } from "./MenuConstant";

/**
 * @typedef ProSideBarProps
 * @prop {boolean} collapsed Side Bar 펼침 여부
 */
interface ProSideBarProps {
    collapsed: boolean;
}

export const ProSideBar = (props: ProSideBarProps): JSX.Element => {
    const { collapsed } = props;

    const dispatch = useAppDispatch();

    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { themeMode, activeAppPath } = storedCommon;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const [currentActiveAppPath, setCurrentActiveAppPath] = useState(activeAppPath ? activeAppPath : "/");

    /**
     * @private
     * @description [useEffect hooks] store에 저장된 메뉴 active path를 가져와 셋팅
     */
    useEffect(() => {
        setCurrentActiveAppPath(activeAppPath);
    }, [activeAppPath]);

    /**
     * @name handleThemeModeChange
     * @function
     * @description 테마 설정 변경
     * @return {undefined}
     */
    const handleThemeModeChange = useCallback(
        (_themeMode: THEME_MODE) => {
            dispatch(setStoredThemeMode(_themeMode));
        },
        [dispatch]
    );

    /**
     * @name isChildActive
     * @function
     * @description 서브메뉴일 경우 하위 목록이 선택되었는지의 여부에 따라 active 반환
     * @return {boolean}
     */
    const isChildActive = useCallback(
        (subMenus: Menu[]): boolean =>
            subMenus.some((subMenu) => currentActiveAppPath === `${process.env.REACT_APP_URL}${subMenu.path}`),
        [currentActiveAppPath]
    );

    return (
        <ProSidebar
            collapsed={collapsed}
            width={200}
            collapsedWidth={60}
            className={process.env.REACT_APP_SIDE_BAR_FIXED === "true" ? "fixed" : ""}
        >
            {process.env.REACT_APP_SIDE_BAR_HEADER === "true" && (
                <SidebarHeader>
                    <Link to={""}>
                        <StyledMainLogoImg src={Logo} alt="logo" />
                    </Link>
                </SidebarHeader>
            )}
            <SidebarContent>
                <SidebarMenu iconShape="circle">
                    {authMenus.map((menu, index) => {
                        if (!menu.children || menu.hideChildren) {
                            return (
                                <SidebarMenuItem
                                    title={menu.name}
                                    key={index}
                                    icon={menu.icon}
                                    active={
                                        currentActiveAppPath === "/"
                                            ? index === 0
                                            : currentActiveAppPath === `${process.env.REACT_APP_URL}${menu.path}`
                                    }
                                >
                                    <Link to={menu.path || ""} />
                                    {menu.name}
                                </SidebarMenuItem>
                            );
                        } else {
                            return (
                                <SidebarSubMenu
                                    title={menu.name}
                                    icon={menu.icon}
                                    key={index}
                                    defaultOpen={true}
                                    className={isChildActive(menu.children) ? "active" : ""}
                                >
                                    {menu.children.map((subMenu, childrenIndex) => {
                                        return (
                                            <SidebarMenuItem
                                                title={subMenu.name}
                                                key={childrenIndex}
                                                active={
                                                    currentActiveAppPath ===
                                                    `${process.env.REACT_APP_URL}${subMenu.path}`
                                                }
                                            >
                                                <Link to={subMenu.path || ""} />
                                                {subMenu.name}
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarSubMenu>
                            );
                        }
                    })}
                </SidebarMenu>
            </SidebarContent>
            {process.env.REACT_APP_SIDE_BAR_FOOTER === "true" && (
                <StyledSidebarFooter>
                    <StyledSideBarFooterDiv>
                        {process.env.REACT_APP_THEME === "true" && themeMode === THEME_LIGHT && (
                            <BsFillSunFill title="다크 테마 변경" onClick={() => handleThemeModeChange(THEME_DARK)} />
                        )}
                        {process.env.REACT_APP_THEME === "true" && themeMode === THEME_DARK && (
                            <BsFillMoonFill
                                title="라이트 테마 변경"
                                onClick={() => handleThemeModeChange(THEME_LIGHT)}
                            />
                        )}
                    </StyledSideBarFooterDiv>
                </StyledSidebarFooter>
            )}
        </ProSidebar>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledMainLogoImg = styled.img`
    width: 120px;
    height: 50px;
    cursor: pointer;
`;

const StyledSideBarFooterDiv = styled.div`
    padding: 20px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
        font-size: 16px;
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;

const StyledSidebarFooter = styled(SidebarFooter)`
    text-align: center;
`;
