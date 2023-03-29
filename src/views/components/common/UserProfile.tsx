/**
 * [공통컴포넌트] 유저 프로필(drop down) 표시 컴포넌트
 */
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@innodep/tms-react-ui";
import { MdClose } from "react-icons/md";
import styled, { css } from "styled-components";

import { persistor } from "../../../services/store";
import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../services/store/hooks";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledDropdownButton = styled.div<{ isDropdownOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    z-index: 11;
    font-size: 12px;
    color: ${({ theme }) => theme.layoutHeaderColor};
    &:hover {
        background-color: ${({ theme }) => theme.iconButtonHoverBgColor};
    }
    ${(props) =>
        props.isDropdownOpen &&
        css`
            background-color: ${({ theme }) => theme.iconButtonHoverBgColor};
        `}
`;

const StyledCircleUserProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    color: rgba(248, 249, 250, 1);
`;

const StyledDropdown = styled.div<{ isDropdownOpen: boolean }>`
    background: ${({ theme }) => theme.proSideBarBgColor};
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: auto;
    inset: 58px 8px auto auto;
    right: 12px;
    gap: 16px;
    z-index: 101;
    font-size: 12px;
    cursor: default;
    background-clip: border-box;
    border: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    border-radius: 4px;
    color: ${({ theme }) => theme.proSideBarColor};
    line-height: 1.43;
    letter-spacing: 0.3px;
    padding: 0 8px;
    ${(props) =>
        !props.isDropdownOpen &&
        css`
            display: none;
        `}
`;

const StyledDropDownHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    padding: 8px;
    > span {
        font-weight: 700;
    }
    > svg {
        font-size: 18px;
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;

const StyledDropDownBody = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 16px;
`;

const StyledDropDownFooter = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 8px 16px;
    gap: 4px;
`;

const StyledDropDownButton = styled(Button)`
    width: 100%;
`;

const StyledDropDownProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const UserProfile = (): JSX.Element => {
    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { loginUserInfo } = storedInitData;

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropDownRef = useRef<HTMLDivElement>(null);

    /**
     * @private
     * @description [useEffect hooks] dropdown 영역 외 클릭 시 hide 처리
     */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (
                dropDownRef.current &&
                buttonRef.current &&
                !dropDownRef.current.contains(target) &&
                !buttonRef.current.contains(target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    /**
     * @name logout
     * @async
     * @function
     * @description 로그아웃
     * @return {void}
     */
    const logout = useCallback(async () => {
        await persistor.purge();
        // TODO: 로그아웃 실행
    }, []);

    /**
     * @name handleLogoutClick
     * @function
     * @description 로그아웃 처리
     * @return {void}
     */
    const handleLogoutClick = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <>
            <StyledDropdownButton
                isDropdownOpen={isDropdownOpen}
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <StyledCircleUserProfile color="#003077">{loginUserInfo?.user_name.charAt(0)}</StyledCircleUserProfile>
            </StyledDropdownButton>
            <StyledDropdown isDropdownOpen={isDropdownOpen} ref={dropDownRef}>
                <StyledDropDownHeader>
                    <span>계정정보</span>
                    <MdClose onClick={() => setIsDropdownOpen(false)} />
                </StyledDropDownHeader>
                <StyledDropDownBody>
                    <StyledDropDownProfile>
                        <span>사번</span>
                        <span>이름</span>
                        <span>전화번호</span>
                    </StyledDropDownProfile>
                    <StyledDropDownProfile>
                        <span>{loginUserInfo?.user_account}</span>
                        <span>{loginUserInfo?.user_name}</span>
                        <span>{loginUserInfo?.mobile_num || "-"}</span>
                    </StyledDropDownProfile>
                </StyledDropDownBody>
                <StyledDropDownFooter>
                    <StyledDropDownButton size="sm" onClick={handleLogoutClick}>
                        로그아웃
                    </StyledDropDownButton>
                </StyledDropDownFooter>
            </StyledDropdown>
        </>
    );
};
