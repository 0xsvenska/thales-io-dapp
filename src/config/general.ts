import { Network } from 'enums/network';

export const generalConfig = {
    API_URL: 'https://api.thalesmarket.io',
    ONE_INCH_API_URL: 'https://api.1inch.io/v5.0/',
    NETWORK_API_URL: {
        [Network.OptimismMainnet]: 'https://api-optimistic.etherscan.io/',
        [Network.OptimismGoerli]: 'https://api-goerli-optimistic.etherscan.io/',
        [Network.Arbitrum]: 'https://api.arbiscan.io/',
        [Network.PolygonMainnet]: 'https://api.polygonscan.com/',
        [Network.Base]: 'https://api.basescan.org/',
        [Network.Mainnet]: 'https://api.etherscan.io/',
    },
    CELER_BRIDGE_URL: 'https://cbridge-prod2.celer.app',
};
