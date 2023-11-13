import { Provider } from '@wagmi/core';
import { Signer } from 'ethers';

type SnxJSConnector = {
    initialized: boolean;
    provider: Provider | undefined;
    signer: Signer | undefined;
    setContractSettings: (contractSettings: any) => void;
};

// @ts-ignore
const snxJSConnector: SnxJSConnector = {
    initialized: false,

    setContractSettings: function (contractSettings: any) {
        this.initialized = true;
        this.signer = contractSettings.signer;
        this.provider = contractSettings.provider;
    },
};

// const conditionalInitializeContract = (contract: any, contractSettings: any) =>
//     contract.addresses[contractSettings.networkId || 1] !== 'TBD'
//         ? new ethers.Contract(
//               contract.addresses[contractSettings.networkId || 1],
//               contract.abi,
//               snxJSConnector.provider
//           )
//         : undefined;

export default snxJSConnector;
