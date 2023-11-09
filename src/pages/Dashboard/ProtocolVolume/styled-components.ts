import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    grid-template-areas: 'top top' 'bottom-left bottom-right';
`;

export const Header = styled.div`
    grid-area: top;
    height: 100%;
    width: 100%;
    text-align: left;
    padding: 20px;
`;

export const NumericStats = styled.span`
    font-family: Nunito !important;
    font-weight: 700;
    font-size: 40px;
    line-height: 55px;
    color: ${(props) => props.theme.textColor.secondary};
`;
