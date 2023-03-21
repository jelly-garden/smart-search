/**
 * 외부 라이브러리 Override Global 스타일 관리 파일
 */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalOverrideStyle = createGlobalStyle`
    ${reset};
    /* pro sidebar override  */
    .pro-sidebar:not(.collapsed) .popper-inner {
        display: none;
    }

    .pro-sidebar-inner {
        background: ${({ theme }) => theme.proSideBarBgColor} !important;
        color: ${({ theme }) => theme.proSideBarColor};
        border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
        .pro-sidebar-header {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: none !important;
            min-height: 50px;
            height: 50px;
        }
        .pro-menu {
            .pro-menu-item {
                font-size: 12px;
                .pro-inner-item {
                    padding: 6px 25px 6px 12px !important;
                    .pro-icon-wrapper {
                        background-color: transparent !important;
                        .pro-icon > * {
                            font-size: 20px;
                        }
                    }
                    &:focus {
                        color: ${({ theme }) => theme.proSideBarActiveColor} !important;
                    }
                    &:hover {
                        color: ${({ theme }) => theme.proSideBarActiveColor} !important;
                        font-weight: 900;
                    }
                }
                &.active {
                        color: ${({ theme }) => theme.proSideBarColor} !important;
                     > .pro-inner-item {
                        color: ${({ theme }) => theme.proSideBarActiveColor} !important;
                        font-weight: 900;
                    }
                }
            }
            .pro-menu-item.pro-sub-menu {
                .pro-inner-list-item {
                    background-color: ${({ theme }) => theme.proSideBarBgColor} !important;
                    min-width: 180px !important;
                    padding-left: 45px;
                    overflow-x: hidden;
                    ul {
                        padding-top: 0;
                        padding-bottom: 0;
                        li {
                            padding-top: 4px;
                            padding-bottom: 4px;
                        }
                    }
                    .pro-menu-item.pro-sub-menu {
                        .pro-inner-list-item {
                            padding-left: 10px;
                        }
                    }
                }
                .popper-element {
                    background: transparent !important;
                    > .popper-inner {
                        background: ${({ theme }) => theme.proSideBarBgColor} !important;
                        color: ${({ theme }) => theme.proSideBarColor};
                        border: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
                    }
                }
            }
        }
    }

    /* tabulator data table override  */
    .tabulator {
        margin: 0;
        border-radius: 0;
        background: ${({ theme }) => theme.contentBgColor} !important;
        border: 1px solid ${({ theme }) => theme.contentBorderColor}
    }
    .tabulator-header {
        background-color: ${({ theme }) => theme.tableHeaderBgColor} !important;
        color: ${({ theme }) => theme.tableColor} !important;
        border-bottom: 2px solid #1c4c94;
        .tabulator-col {
            background-color: ${({ theme }) => theme.tableHeaderBgColor} !important;
        }
    }
    .tabulator-tableholder {
        overflow-y: auto !important;
        .tabulator-placeholder {
            width: 100% !important;
        }
    }
    .tabulator-row {
        border-bottom: 1px solid ${({ theme }) => theme.contentBorderColor} !important;
        font-size: 13px;
        &.tabulator-row-odd {
            background-color: ${({ theme }) => theme.tableRowOddBgColor} !important;
            color: ${({ theme }) => theme.contentColor} !important;
        }
        &.tabulator-row-even {
            background-color: ${({ theme }) => theme.tableRowEvenBgColor} !important;
            color: ${({ theme }) => theme.contentColor} !important;
        }
        &.tabulator-selected {
            box-shadow: inset 0 0 rgb(0 0 0 / 87%);
            background: #e0e0e0 !important;
            color: rgba(0, 0, 0, 0.8705882353) !important;
            &:hover {
                box-shadow: inset 0 0 rgb(0 0 0 / 87%);
                background: #e0e0e0 !important;
                color: rgba(0, 0, 0, 0.8705882353) !important;
            }
        }
        .tabulator-cell {
            font-size: 12px !important;
            .tabulator-data-tree-branch {
                border-left: 2px solid  ${({ theme }) => theme.contentColor};
                border-bottom: 2px solid  ${({ theme }) => theme.contentColor};
            }
        }
        .tabulator-data-tree-control {
            border: 1px solid ${({ theme }) => theme.contentColor} !important;
            .tabulator-data-tree-control-expand {
                background: ${({ theme }) => theme.contentColor} !important;
                &:after {
                    background: ${({ theme }) => theme.contentColor} !important;
                }
            }
            .tabulator-data-tree-control-collapse:after {
                background: ${({ theme }) => theme.contentColor} !important;
            }
        }
    }

    /* vworld 지도 관련 */
    .wsMapContainer {
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        .naviZoomPannel {
            display: none;
        }
        .naviRotate {
            top: 8px;
            right: 8px;
        }
        .coordinatesContainer {
            display: none;
        }
    }

    /* rc-tree */
    .rc-tree-list .rc-tree-list-holder {
        .rc-tree-list-holder-inner {
            .rc-tree-treenode {
                position: relative;
            }
            .rc-tree-iconEle {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 18px;
            }
            .rc-tree-switcher {
                position: absolute;
                top: 50%;
                transform: translateY(-45%);
            }
            .rc-tree-checkbox {
                margin-left: 18px !important;
            }
            .rc-tree-title {
                font-size: 14px;
                font-weight: 400;
            }
            .rc-tree-treenode:first-child, .rc-tree-treenode:nth-child(2) {
                .rc-tree-checkbox-disabled {
                    display: none !important;
                }
                .rc-tree-node-content-wrapper {
                    margin-left: 14px;
                }
            }
            .rc-tree-treenode:not(first-child) {
                .rc-tree-iconEle {
                    margin-left: 4px;
                }
                .rc-tree-title {
                    margin-left: 26px !important;
                }
            }
        }
    }

    /* html switch css */
    .switch {
        position: relative;
        display: inline-block;
        width: 26px;
        height: 16px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #0f7acb;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #0f7acb;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(11px);
        -ms-transform: translateX(11px);
        transform: translateX(11px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`;
