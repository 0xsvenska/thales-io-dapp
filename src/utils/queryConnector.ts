import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { QueryClient } from 'react-query';

type QueryConnector = {
    queryClient: QueryClient;
    setQueryClient: () => void;
};

// @ts-ignore
const queryConnector: QueryConnector = {
    setQueryClient: function () {
        if (this.queryClient === undefined) {
            this.queryClient = new QueryClient();
        }
    },
};

export const refetchTokenQueries = (walletAddress: string, networkId: Network) => {
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.StakingData(networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.UserStakingData(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.UserVestingData(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.Transactions(walletAddress, networkId, undefined));
    // queryConnector.queryClient.invalidateQueries(QUERY_KEYS.WalletBalances.Thales(walletAddress, networkId));
};

// export const refetchLPStakingQueries = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.LPStaking(walletAddress, networkId));
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.GelatoBalance(walletAddress, networkId));
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.Gelato());
// };

// export const refetchUserTokenTransactions = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.Transactions(walletAddress, networkId, undefined));
// };

// export const refetchMigratedInvestorsRetroRewards = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(
//         QUERY_KEYS.Token.MigratedInvestorsRetroRewards(walletAddress, networkId)
//     );
// };

// export const refetchVestingEscrow = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.VestingEscrow(walletAddress, networkId));
// };

// export const refetchBalances = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.WalletBalances.StableCoinBalance(walletAddress, networkId));
//     queryConnector.queryClient.invalidateQueries(
//         QUERY_KEYS.WalletBalances.MultipleCollateral(walletAddress, networkId)
//     );
// };

// export const refetchProposal = (spaceKey: SpaceKey, hash: string, walletAddress: string) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Governance.Proposal(spaceKey, hash, walletAddress));
// };

// export const refetchLiquidityPoolData = (walletAddress: string, networkId: Network) => {
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.LiquidityPool.Data(networkId));
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.LiquidityPool.UserData(walletAddress, networkId));
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.LiquidityPool.PnL(networkId));
//     queryConnector.queryClient.invalidateQueries(QUERY_KEYS.LiquidityPool.UserTransactions(networkId));
// };

// export const refetchStakingLeaderboardData = (walletAddress: string, networkId: Network, period: number) => {
//     queryConnector.queryClient.invalidateQueries(
//         QUERY_KEYS.Token.StakersLeaderboardData(walletAddress, networkId, period)
//     );
// };

export default queryConnector;