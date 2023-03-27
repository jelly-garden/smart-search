/**
 * 모든 레이아웃을 포괄하는 부모 컴포넌트
 */
import React, { useState, useMemo } from "react";

import { FaBars } from "react-icons/fa";
import { Route, Redirect, Switch } from "react-router-dom";
import styled from "styled-components";

import { InitDataState } from "../../services/store/common/init-data-slice";
import { useAppSelector } from "../../services/store/hooks";
import { CurrentDate, ProSideBar, ToggleSwitch, UserProfile, Breadcrumb } from "../components/common";
import { Aside, Content, ContentLayout, Header } from "../layouts";

export const Layout = (): JSX.Element => {
    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const defaultPath = useMemo((): string => {
        if (authMenus.length > 0) {
            return authMenus[0].path;
        }
        return "";
    }, [authMenus]);

    return (
        <StyledLayoutDiv>
            {process.env.REACT_APP_SIDE_BAR === "true" && (
                <Aside>
                    <ProSideBar collapsed={collapsed} />
                </Aside>
            )}
            <ContentLayout>
                {process.env.REACT_APP_HEADER === "true" && (
                    <Header>
                        <StyledHeaderDivWrap>
                            {process.env.REACT_APP_COLLAPSED === "true" && (
                                <FaBars onClick={() => setCollapsed(!collapsed)} />
                            )}
                            <Breadcrumb />
                        </StyledHeaderDivWrap>
                        <StyledHeaderDivWrap>
                            {process.env.REACT_APP_TRANSLATE === "true" && <ToggleSwitch />}
                            {process.env.REACT_APP_USER_PROFILE === "true" && <UserProfile />}
                            {process.env.REACT_APP_CURRENT_DATE === "true" && <CurrentDate />}
                        </StyledHeaderDivWrap>
                    </Header>
                )}
                <Content>
                    <Switch>
                        {authMenus.map((menu, index) => (
                            <Route key={index} path={menu.path} component={menu.component} exact={menu.isLeafMenu} />
                        ))}
                        {authMenus.length > 0 && <Redirect from="*" to={defaultPath}></Redirect>}
                    </Switch>
                </Content>
            </ContentLayout>
        </StyledLayoutDiv>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledLayoutDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
`;

const StyledHeaderDivWrap = styled.div`
    display: flex;
    gap: 8px;
    color: ${({ theme }) => theme.layoutHeaderColor};
    > img {
        height: 45px;
        width: 100px;
    }
    > svg {
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;
