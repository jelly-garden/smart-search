import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";

import { CommonState, setStoredActiveApp } from "../../../services/store/common/common-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import { StyledPageDiv } from "../../../styles";
import { LoadingSpinner } from "../../components/common";
import { SubMenuRoutes } from "../common/SubMenuRoutes";

export const SearchCarNumberPage = ({ match }: RouteComponentProps): JSX.Element => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { pageLoading } = storedCommon;

    const dispatch = useAppDispatch();

    /**
     * @hooks
     * @description [useEffect hooks] Side Nav, 현재 Active 앱 Store 저장 처리
     */
    useEffect(() => {
        dispatch(setStoredActiveApp(`${process.env.REACT_APP_URL}${match.url}`));
    }, [dispatch, match.url]);

    return (
        <StyledPageDiv>
            {pageLoading && <LoadingSpinner />}
            <SubMenuRoutes parentPath={match.path} />
        </StyledPageDiv>
    );
};
