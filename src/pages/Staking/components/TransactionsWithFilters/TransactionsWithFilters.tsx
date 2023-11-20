import checkmark from 'assets/images/checkmark.svg';
import Button from 'components/Button';
import { TransactionFilterEnum } from 'enums/token';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { orderBy } from 'lodash';
import useUserTokenTransactionsQuery from 'queries/token/useUserTokenTransactionsQuery';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';
import { TokenTransaction } from 'types/token';
import { SectionHeader } from '../../styled-components';
import TransactionsTable from '../TransactionsTable';

type TransactionsWithFiltersProps = {
    filters: TransactionFilterEnum[];
    hideFilters?: boolean;
    hideTitle?: boolean;
    width?: string;
    height?: string;
};

const TransactionsWithFilters: React.FC<TransactionsWithFiltersProps> = ({
    filters,
    hideFilters,
    hideTitle,
    width,
    height,
}) => {
    const { t } = useTranslation();
    // const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    // const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const [filter, setFilter] = useState<string>(TransactionFilterEnum.ALL);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const userTokenTransactionsQuery = useUserTokenTransactionsQuery(walletAddress, networkId, undefined, {
        enabled: true, // isAppReady && isWalletConnected
    });

    const userTokenTransactions = useMemo(
        () =>
            userTokenTransactionsQuery.isSuccess && userTokenTransactionsQuery.data
                ? orderBy(
                      userTokenTransactionsQuery.data.filter((tx: TokenTransaction) =>
                          filters.includes(tx.type as TransactionFilterEnum)
                      ),
                      ['timestamp', 'blockNumber'],
                      ['desc', 'desc']
                  )
                : [],
        [userTokenTransactionsQuery.data, filters, userTokenTransactionsQuery.isSuccess]
    );

    const filteredTransactions = useMemo(
        () =>
            filter === TransactionFilterEnum.ALL
                ? userTokenTransactions
                : userTokenTransactions.filter((tx: TokenTransaction) => tx.type.startsWith(filter)),
        [userTokenTransactions, filter]
    );

    return (
        <SectionContainer width={width} height={height} txCount={filteredTransactions.length}>
            {!hideTitle && (
                <SectionHeader>
                    <i className="icon icon--lightbulb" />
                    {t('staking.table.title')}
                </SectionHeader>
            )}

            {!hideFilters && (
                <FilterWrapper>
                    <FilterContainer
                        onMouseEnter={() => (isMobile ? '' : setShowFilters(true))}
                        onMouseLeave={() => setShowFilters(false)}
                    >
                        <Button
                            height="30px"
                            padding="5px 40px"
                            fontSize="15px"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {t(`staking.table.filter.button`)}
                        </Button>
                        <DropDownWrapper hidden={!showFilters}>
                            <DropDown>
                                {filters.map((filterItem) => {
                                    if (filterItem === TransactionFilterEnum.LP_CLAIM_STAKING_REWARDS_SECOND)
                                        return null;
                                    return (
                                        <FilterText
                                            onClick={() => {
                                                setFilter(filterItem);
                                                setShowFilters(false);
                                            }}
                                            className={filter === filterItem ? 'selected' : ''}
                                            key={filterItem}
                                        >
                                            {t(`staking.table.filter.${filterItem}`)}
                                        </FilterText>
                                    );
                                })}
                            </DropDown>
                        </DropDownWrapper>
                    </FilterContainer>
                </FilterWrapper>
            )}

            <SectionContent>
                <TransactionsTable
                    transactions={filteredTransactions}
                    isLoading={userTokenTransactionsQuery.isLoading}
                    noResultsMessage={t(`staking.table.no-results.${filter}`)}
                />
            </SectionContent>
        </SectionContainer>
    );
};

const SectionContainer = styled.section<{
    txCount: number;
    width?: string;
    height?: string;
}>`
    font-family: Nunito;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.txCount > 10 ? (props.height ? props.height : '390px') : '100%')};
    min-height: 200px;
    margin-bottom: 100px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        height: 100%;
    }
`;

const SectionContent = styled(FlexDivColumn)`
    margin-top: 15px;
    height: calc(100% - 52px);
`;

const FilterWrapper = styled.div`
    position: relative;
`;

const FilterContainer = styled.div`
    position: absolute;
    top: -30px;
    right: 0;
    width: 115px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100px;
    }
`;

const DropDownWrapper = styled.div`
    position: relative;
    top: 5px;
    right: 103px;
    width: 220px;
    padding: 2px;
    z-index: 100;
    border-radius: 15px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        right: 100px;
    }
`;
const DropDown = styled.div`
    background: ${(props) => props.theme.button.background.secondary};
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 5px;
    .selected {
        color: ${(props) => props.theme.button.textColor.primary} !important;
        &:before {
            content: url(${checkmark});
            position: absolute;
            right: 15px;
            transform: scale(0.9);
        }
    }
`;

const FilterText = styled.p`
    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    padding: 8px 10px;
    border-radius: 8px;
    color: ${(props) => props.theme.textColor.primary};
    &:hover {
        background: ${(props) => props.theme.background.primary};
    }
`;

export default TransactionsWithFilters;