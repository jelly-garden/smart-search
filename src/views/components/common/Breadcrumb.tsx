import React, { useMemo, useCallback } from "react";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../services/store/hooks";

import { Menu } from "./MenuConstant";

/**
 * Breadcrumb 표시용 item 정의
 * @typedef {Object} BreadcrumbItem
 * @property {string} name 메뉴 명
 * @property {string} path 메뉴 경로
 */
interface BreadcrumbItem {
    name: string;
    path: string;
}

/**
 * @name Breadcrumb
 * @description [공통컴포넌트] 헤더 영역 내 현재 경로 표시용 컴포넌트
 * @return {JSX.Element}
 */
export const Breadcrumb = () => {
    const location = useLocation();

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    /**
     * @name findMenu
     * @function
     * @description 일치하는 메뉴 탐색
     * @param {string} locationPath 현재 url path
     * @param {string} menuPath 메뉴 항목의 path
     * @param {number} compareCount 비교할 path 길이
     * @return {boolean}
     */
    const findMenu = (locationPath: string, menuPath: string, compareCount: number): boolean => {
        const locationPathArr = locationPath.split("/");
        locationPathArr.splice(compareCount);
        const menuPathArr = menuPath.split("/");
        menuPathArr.splice(compareCount);
        return locationPathArr.join("/") === menuPathArr.join("/");
    };

    /**
     * @name createBreadcrumbItems
     * @function
     * @description breadcrumbs 아이템 목록 생성
     * @param {BreadcrumbItem[]} prev 이전 breadcrumbs 아이템 목록
     * @param {Menu[]} menus 메뉴 목록
     * @param {number} compareCount 비교할 path 길이
     * @return {BreadcrumbItem[]}
     */
    const createBreadcrumbItems = useCallback(
        (prev: BreadcrumbItem[], menus: Menu[], compareCount: number): BreadcrumbItem[] => {
            const selectedMenu = menus.find((menu) => findMenu(location.pathname, menu.path, compareCount));
            if (selectedMenu) {
                if (selectedMenu.name !== "") {
                    prev.push({ name: selectedMenu.name, path: selectedMenu.path });
                }
                if (selectedMenu.children) {
                    const nextCompareCount = compareCount + 1;
                    createBreadcrumbItems(prev, selectedMenu.children, nextCompareCount);
                }
                return prev;
            } else {
                return [];
            }
        },
        [location.pathname]
    );

    /**
     * @const {BreadcrumbItem[]}
     * @description BeardCrumbs 경로 표시 데이터
     */
    const breadcrumbItems: BreadcrumbItem[] = useMemo(
        () => createBreadcrumbItems([], authMenus, 2),
        [authMenus, createBreadcrumbItems]
    );

    return (
        <nav aria-label="breadcrumb">
            <StyledBreadcrumbOl>
                {breadcrumbItems.map((breadcrumbItem, index) => (
                    <StyledBreadcrumbItem key={index} active={index === breadcrumbItems.length - 1}>
                        {index !== breadcrumbItems.length - 1 && (
                            <>
                                <Link to={breadcrumbItem.path} style={{ textDecoration: "none" }}>
                                    {breadcrumbItem.name}
                                </Link>
                                <StyledBreadcrumbItemSeparator>
                                    <MdOutlineArrowForwardIos />
                                </StyledBreadcrumbItemSeparator>
                            </>
                        )}
                        {index === breadcrumbItems.length - 1 && <span>{breadcrumbItem.name}</span>}
                    </StyledBreadcrumbItem>
                ))}
            </StyledBreadcrumbOl>
        </nav>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledBreadcrumbOl = styled.ol`
    margin: 0;
    padding: 0;
`;

const StyledBreadcrumbItem = styled.li<{ active: boolean }>`
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    a,
    span {
        color: ${({ active, theme }) => (active ? theme.proSideBarActiveColor : theme.proSideBarColor)};
        font-weight: 700;
    }
    a:hover {
        color: ${({ theme }) => theme.proSideBarActiveColor};
    }
`;

const StyledBreadcrumbItemSeparator = styled.span`
    margin-inline: 8px;
    svg {
        width: 12px;
        height: 12px;
        vertical-align: middle;
    }
`;
