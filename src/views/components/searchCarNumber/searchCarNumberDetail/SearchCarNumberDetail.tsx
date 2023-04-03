import React, { useCallback } from "react";

import moment from "moment/moment";
import { AiOutlineLeft } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { GetLprCountsByDeviceResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledIconButton,
    StyledListItemActionWrap,
    StyledListItemContent,
    StyledListItemContentWrap,
    StyledListItemImage,
    StyledListItemImageWrap,
    StyledListItem,
    StyledListItemContentLabel,
    StyledListItemContentLabelWrap,
    StyledVerticalListLi,
    StyledListItemContentText,
    StyledListItemContentTextWrap,
    StyledVerticalListUl,
} from "../../../../styles";
import { Device } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberDetailProps {
    lprCountsByDevice: GetLprCountsByDeviceResult[];
    selectedCarNumber: string;
    selectedDevice?: Device;
    selectDevice: (device: Device | undefined) => void;
    onBackButtonClick: () => void;
}

export const SearchCarNumberDetail = (props: SearchCarNumberDetailProps) => {
    const { lprCountsByDevice, selectedCarNumber, selectedDevice, selectDevice, onBackButtonClick } = props;

    const history = useHistory();

    /**
     * @name handleListItemClick
     * @function
     * @description 목록 요소 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleListItemClick = useCallback(
        (count: GetLprCountsByDeviceResult) => {
            selectDevice({
                dev_name: count.dev_name,
                location: count.location,
                dev_serial: count.dev_serial,
            });
        },
        [selectDevice]
    );

    /**
     * @name handleRouteButtonClick
     * @function
     * @description 경로검색 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleRouteButtonClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, count: GetLprCountsByDeviceResult) => {
            e.stopPropagation();
            history.push(`/search-path?car_num=${count.car_num}&recent_date=${count.recent_date}`);
        },
        [history]
    );

    return (
        <StyledWrap>
            <StyledHeader>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onBackButtonClick}>
                    <AiOutlineLeft size="80%" />
                </StyledIconButton>
                <span>{selectedCarNumber}</span>
            </StyledHeader>
            <StyledContent>
                <StyledVerticalListUl>
                    {lprCountsByDevice.map((lprCountByDevice, index) => (
                        <StyledVerticalListLi
                            key={index}
                            onClick={() => handleListItemClick(lprCountByDevice)}
                            active={lprCountByDevice.dev_serial === selectedDevice?.dev_serial}
                        >
                            <StyledListItem>
                                <StyledListItemImageWrap>
                                    <StyledListItemImage alt="image" src={lprCountByDevice.image1} />
                                </StyledListItemImageWrap>
                                <StyledListItemContentWrap>
                                    <StyledListItemContent>
                                        <StyledListItemContentLabelWrap>
                                            <StyledListItemContentLabel>장비명 : </StyledListItemContentLabel>
                                        </StyledListItemContentLabelWrap>
                                        <StyledListItemContentTextWrap>
                                            <StyledListItemContentText>
                                                {lprCountByDevice.dev_name}
                                            </StyledListItemContentText>
                                        </StyledListItemContentTextWrap>
                                        <StyledListItemContentLabelWrap>
                                            <StyledListItemContentLabel>위도/경도 : </StyledListItemContentLabel>
                                        </StyledListItemContentLabelWrap>
                                        <StyledListItemContentTextWrap>
                                            <StyledListItemContentText>
                                                {lprCountByDevice.location.latitude} /{" "}
                                                {lprCountByDevice.location.longitude}
                                            </StyledListItemContentText>
                                        </StyledListItemContentTextWrap>
                                        <StyledListItemContentLabelWrap>
                                            <StyledListItemContentLabel>최근발생일 : </StyledListItemContentLabel>
                                        </StyledListItemContentLabelWrap>
                                        <StyledListItemContentTextWrap>
                                            <StyledListItemContentText>
                                                {moment(lprCountByDevice.recent_date).format("YYYY-MM-DD HH:mm")}
                                            </StyledListItemContentText>
                                        </StyledListItemContentTextWrap>
                                        <StyledListItemContentLabelWrap>
                                            <StyledListItemContentLabel>총 발생 횟수 : </StyledListItemContentLabel>
                                        </StyledListItemContentLabelWrap>
                                        <StyledListItemContentTextWrap>
                                            <StyledListItemContentText>
                                                {lprCountByDevice.count}회
                                            </StyledListItemContentText>
                                        </StyledListItemContentTextWrap>
                                    </StyledListItemContent>
                                </StyledListItemContentWrap>
                                <StyledListItemActionWrap>
                                    <StyledIconButton
                                        size={"sm"}
                                        variant={"ghost"}
                                        title={"경로검색"}
                                        onClick={(e) => handleRouteButtonClick(e, lprCountByDevice)}
                                    >
                                        <MdRoute size="80%" />
                                    </StyledIconButton>
                                </StyledListItemActionWrap>
                            </StyledListItem>
                        </StyledVerticalListLi>
                    ))}
                </StyledVerticalListUl>
            </StyledContent>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    height: 100%;
`;
const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 14px 16px;
    background: ${({ theme }) => theme.contentHeaderBgColor};
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledContent = styled.div`
    height: calc(100% - 53px);
    padding: 0 8px;
    overflow-y: auto;
`;
