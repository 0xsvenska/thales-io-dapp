import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 670px);
    grid-template-rows: repeat(3, 160px);
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'upper-left upper-right' 'upper-left middle-right' 'upper-left bottom-right';
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const Left = styled.div`
    grid-area: upper-left;
    > div:nth-child(2) {
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
    }
`;

export const UpperRight = styled.div`
    grid-area: upper-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const MiddleRight = styled.div`
    grid-area: middle-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BottomRight = styled.div`
    grid-area: bottom-right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Line = styled.div`
    margin: 50px 0;
    width: 50%;
    height: 4px;
    border-radius: 10px;
    background: ${(props) => props.theme.background.tertiary};
`;

export const NavContainer = styled.div`
    width: 55%;
    margin-bottom: 45px;
`;

export const SectionTitle = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primary};
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
    text-transform: uppercase;
    > span > i {
        margin-right: 5px;
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const SectionSubtitle = styled.div`
    margin-top: 5px;
    > span {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const SectionText = styled.div`
    margin-top: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    > span {
        color: ${(props) => props.theme.textColor.primary};
        font-family: NunitoBold;
    }
`;

export const FinalPointsTitle = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: normal;
`;

export const FinalPoints = styled.div`
    color: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: normal;
`;

export const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span:nth-child(1) {
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.primary};
        text-align: right;
        font-family: NunitoBold;
        line-height: 155%;
    }
`;

export const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const ClaimButton = styled.button`
    color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    text-transform: uppercase;
    padding: 5px 7px;
`;

export const ClaimButtonDisclaimer = styled.span`
    color: ${(props) => props.theme.textColor.tertiary};
    position: absolute;
    font-family: Nunito;
    top: -60%;
    text-align: center;
    width: 125px;
`;