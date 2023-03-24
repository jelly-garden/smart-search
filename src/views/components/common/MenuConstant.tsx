/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";

import { AiFillCar } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import { RouteComponentProps } from "react-router-dom";

import { MENU_CODE, MENU_SEARCH_PATH, MENU_SEARCH_VEHICLE } from "../../../services/interfaces";
import { SearchPathPage, SearchVehiclePage } from "../../pages";
import { SearchPath } from "../searchPath";
import { SearchVehicle } from "../searchVehicle";

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

const SearchVehicleMenu: Menu = {
    name: "차번 통합검색",
    code: MENU_SEARCH_VEHICLE,
    icon: <AiFillCar />,
    path: "/search-vehicle",
    component: SearchVehiclePage,
    children: [
        {
            name: "",
            code: "",
            path: "/search-vehicle",
            component: SearchVehicle,
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

export const MENUS: Menu[] = [SearchVehicleMenu, SearchPathMenu];
