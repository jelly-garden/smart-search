import styled from "styled-components";

export const StyledListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const StyledListItemImageWrap = styled.div`
    flex-shrink: 0;
    width: 150px;
    min-height: 84px;
    display: flex;
`;
export const StyledListItemImage = styled.img`
    width: 100%;
`;
export const StyledListItemContentWrap = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    margin-left: 8px;
    margin-bottom: 8px;
`;
export const StyledListItemContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
`;
export const StyledListItemContentLabelWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 42%;
    flex-grow: 0;
    max-width: 42%;
`;
export const StyledListItemContentLabel = styled.p`
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.labelColor};
`;
export const StyledListItemContentTextWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 58%;
    flex-grow: 0;
    max-width: 58%;
`;
export const StyledListItemContentText = styled.p`
    font-size: 14px;
    line-height: 22px;
`;
export const StyledListItemActionWrap = styled.div`
    flex-shrink: 0;
    align-self: flex-start;
    margin: 8px 0 0 8px;
`;
