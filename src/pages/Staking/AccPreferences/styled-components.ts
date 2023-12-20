import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: 320px 320px fr;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'middle' 'bottom';
    margin-bottom: 100px;
    z-index: 1;
    margin-top: 50px;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const Top = styled.div`
    grid-area: top;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const Middle = styled.div`
    grid-area: middle;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const Bottom = styled.div`
    grid-area: bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        height: 100%;
    }
`;

export const Subtitle = styled.span`
    color: ${(props) => props.theme.textColor.primary};
    font-family: NunitoBold;
    font-size: 13px;
    margin-bottom: 10px;
`;

export const ValidationMessage = styled.li`
    color: ${(props) => props.theme.warning.textColor.primary};
`;

export const Message = styled.div`
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
    div {
        margin-bottom: 5px;
    }
    ul {
        list-style: initial;
        margin-left: 15px;
    }
`;

export const StyledLink = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    &:hover {
        text-decoration: underline;
    }
`;

export const ArrowIcon = styled(ArrowHyperlinkIcon)`
    margin-left: 5px;
    ${StyledLink} {
        fill: ${(props) => props.theme.link.textColor.secondary};
    }
    ${StyledLink}:hover & path {
        text-decoration: underline;
    }
`;

export const ClaimContainer = styled.div`
    display: inline-block;
    & > div {
        float: left;
        width: calc(50% - 10px);
    }
    & > div:first-child {
        margin-right: 20px;
    }
`;
