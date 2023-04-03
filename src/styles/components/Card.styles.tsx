import styled from "styled-components";

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
export const StyledCardHeader = styled.div`
    padding: 8px;
    font-size: 14px;
`;
export const StyledCardContent = styled.div``;
export const StyledCardContentImage = styled.img`
    width: 100%;
`;
export const StyledCardFooter = styled.div`
    padding: 8px;
    font-size: 14px;
`;
