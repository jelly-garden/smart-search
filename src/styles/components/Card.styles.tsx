import styled from "styled-components";

export const StyledCardUl = styled.ul`
    padding: 8px 0;
`;
export const StyledCardLi = styled.li`
    margin-bottom: 8px;
    border: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.contentHoverColor};
    }
`;
export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
`;
export const StyledCardHeader = styled.div`
    padding: 8px;
    font-size: 14px;
`;
export const StyledCardBody = styled.div``;
export const StyledCardImage = styled.img`
    width: 100%;
`;
export const StyledCardFooter = styled.div``;
