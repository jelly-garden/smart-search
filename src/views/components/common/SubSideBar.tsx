import React, { useState, useEffect, useMemo } from "react";

import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../services/store/hooks";

import { Menu } from "./MenuConstant";

interface SubSideBarProps {
    parentPath: string;
}

export const SubSideBar = (props: SubSideBarProps) => {
    const { parentPath } = props;

    const location = useLocation();

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const [currentActivePath, setCurrentActivePath] = useState<string>("");

    const subMenus: Menu[] = useMemo(() => {
        const parentPathArr = parentPath.split("/");
        if (parentPathArr.length === 2) {
            const parentMenu = authMenus.find((menu) => menu.path === parentPath);
            if (parentMenu && parentMenu.children) {
                return parentMenu.children;
            }
            return [];
        } else {
            const grandParentMenu = authMenus.find((menu) => menu.path === `/${parentPathArr[1]}`);
            if (grandParentMenu && grandParentMenu.children) {
                const parentMenu = grandParentMenu.children.find((menu) => menu.path === parentPath);
                if (parentMenu && parentMenu.children) {
                    return parentMenu.children;
                }
            }
            return [];
        }
    }, [authMenus, parentPath]);

    useEffect(() => {
        if (location) {
            setCurrentActivePath(location.pathname);
        }
    }, [location]);

    return (
        <StyledSubPageAside>
            {subMenus.map((subMenu, index) => (
                <StyledSubPageAsideMenuItem key={index} active={subMenu.path === currentActivePath}>
                    <Link to={subMenu.path}>{subMenu.name}</Link>
                </StyledSubPageAsideMenuItem>
            ))}
        </StyledSubPageAside>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledSubPageAside = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0 16px 4px;
    width: 10%;
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledSubPageAsideMenuItem = styled.div<{ active: boolean }>`
    padding: 0 16px;
    font-size: 12px;
    height: 24px;
    display: flex;
    align-items: center;
    border-left: 3px solid transparent;
    > a {
        text-decoration: none;
    }
    &:hover {
        color: ${({ theme }) => theme.proSideBarActiveColor} !important;
        font-weight: 900;
    }
    ${(props) =>
        props.active &&
        css`
            color: ${({ theme }) => theme.proSideBarActiveColor} !important;
            font-weight: 900;

            border-left: 3px solid ${({ theme }) => theme.contentBorderColor};
        `}
`;
