/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";

import { AiFillCar } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import { RouteComponentProps } from "react-router-dom";

import { MENU_CODE, MENU_SEARCH_PATH, MENU_SEARCH_CAR_NUMBER } from "../../../services/interfaces";
import { SearchPathPage, SearchCarNumberPage } from "../../pages";
import { SearchCarNumber } from "../searchCarNumber";
import { SearchPath } from "../searchPath";

export interface Menu {
    name: string;
    code: MENU_CODE | "";
    icon?: ReactElement;
    path: string;
    component?: React.ComponentType<RouteComponentProps<any>>;
    children?: Menu[];
    hideChildren?: boolean;
    isLeafMenu?: boolean;
}

const SearchCarNumberMenu: Menu = {
    name: "차번 통합검색",
    code: MENU_SEARCH_CAR_NUMBER,
    icon: <AiFillCar />,
    path: "/search-car-number",
    component: SearchCarNumberPage,
    children: [
        {
            name: "",
            code: "",
            path: "/search-car-number",
            component: SearchCarNumber,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const SearchPathMenu: Menu = {
    name: "차량 경로검색",
    code: MENU_SEARCH_PATH,
    icon: <MdRoute />,
    path: "/search-path",
    component: SearchPathPage,
    children: [
        {
            name: "",
            code: "",
            path: "/search-path",
            component: SearchPath,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

export const MENUS: Menu[] = [SearchCarNumberMenu, SearchPathMenu];
