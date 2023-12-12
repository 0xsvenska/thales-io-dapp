import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

export const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    height: 160px;
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

export const VestingDescription = styled.div`
    line-height: 120%;
`;

export const VestingValid = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: justify;
    font-family: NunitoBold;
    font-size: 18px;
`;

export const ScheduleWrapper = styled(FlexDiv)`
    overflow: auto;
    width: 60%;
    align-items: center;
    padding: 90px 20px;
    margin-bottom: 20px;
    ::-webkit-scrollbar {
        height: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.textColor.quaternary};
    }
`;

export const ScheduleContainer = styled(FlexDiv)`
    font-family: Nunito;
    position: relative;
    align-items: center;
`;

export const ScheduleDot = styled.div`
    background: ${(props) => props.theme.textColor.secondary};
    border-radius: 20px;
    width: 20px;
    height: 20px;
`;

export const ScheduleLine = styled.div<{ invisible?: boolean }>`
    background: ${(props) => props.theme.textColor.secondary};
    height: 5px;
    width: ${(props) => (props.invisible ? '30px' : '70px')};
    visibility: ${(props) => (props.invisible ? 'hidden' : 'visible')};
`;

export const ScheduleAmount = styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor.secondary};
    font-size: 13px;
    transform: translate(calc(-50% + 10px), -60px);
    position: absolute;
    top: 0;
    width: 80px;
`;

export const ScheduleDate = styled.div`
    color: ${(props) => props.theme.textColor.quaternary};
    font-size: 13px;
    transform: translate(calc(-50% + 10px), 60px);
    position: absolute;
    bottom: 0;
    width: 80px;
`;
