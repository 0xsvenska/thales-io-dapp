import { IFrameEthereumProvider } from '@ledgerhq/iframe-provider';
import Loader from 'components/Loader';
import { SUPPORTED_NETWORKS_NAMES } from 'constants/network';
import ROUTES from 'constants/routes';
import 'i18n';
import DappLayout from 'layouts/DappLayout';
import ThemeProvider from 'layouts/Theme';
import { Suspense, lazy, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { setAppReady } from 'redux/modules/app';
import { getSwitchToNetworkId, updateNetworkSettings, updateWallet } from 'redux/modules/wallet';
import { isLedgerDappBrowserProvider } from 'utils/ledger';
import queryConnector from 'utils/queryConnector';
import { history } from 'utils/routes';
import snxJSConnector from 'utils/snxJSConnector';
import { useAccount, useProvider, useSigner } from 'wagmi';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../LandingPage'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ '../Dashboard'));
const Staking = lazy(() => import(/* webpackChunkName: "Dashboard" */ '../Staking'));
const Governance = lazy(() => import(/* webpackChunkName: "Governance" */ '../Governance'));

const App = () => {
    const dispatch = useDispatch();
    const switchedToNetworkId = useSelector((state) => getSwitchToNetworkId(state));
    const { address } = useAccount();
    const provider = useProvider(!address ? { chainId: switchedToNetworkId } : undefined); // when wallet not connected force chain
    const { data: signer } = useSigner();

    const isLedgerLive = isLedgerDappBrowserProvider();

    queryConnector.setQueryClient();

    useEffect(() => {
        const init = async () => {
            let ledgerProvider = null;
            if (isLedgerLive) {
                ledgerProvider = new IFrameEthereumProvider();
                const accounts = await ledgerProvider.enable();
                const account = accounts[0];
                dispatch(updateWallet({ walletAddress: account }));
                ledgerProvider.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        dispatch(updateWallet({ walletAddress: accounts[0] }));
                    }
                });
            }

            try {
                const chainIdFromProvider = (await provider.getNetwork()).chainId;
                const providerNetworkId = isLedgerLive
                    ? ledgerProvider
                    : !!address
                    ? chainIdFromProvider
                    : switchedToNetworkId;

                snxJSConnector.setContractSettings({
                    networkId: providerNetworkId,
                    provider,
                    // @ts-ignore
                    signer: isLedgerLive ? ledgerProvider?.getSigner() : signer,
                });

                dispatch(
                    updateNetworkSettings({
                        // @ts-ignore
                        networkId: providerNetworkId,
                        // @ts-ignore
                        networkName: SUPPORTED_NETWORKS_NAMES[providerNetworkId]?.toLowerCase(),
                    })
                );
                dispatch(setAppReady());
            } catch (e) {
                if (!e.toString().includes('Error: underlying network changed')) {
                    dispatch(setAppReady());
                    console.log(e);
                }
            }
        };
        init();
    }, [dispatch, provider, signer, switchedToNetworkId, address, isLedgerLive]);

    useEffect(() => {
        dispatch(updateWallet({ walletAddress: address }));
    }, [address, dispatch]);

    return (
        <div className="App">
            <ThemeProvider>
                <QueryClientProvider client={queryConnector.queryClient}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path={ROUTES.Home}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Home />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                            <Route exact path={ROUTES.Dashboard}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Dashboard />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                            <Route exact path={ROUTES.Staking}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Staking />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                            <Route
                                exact
                                path={[ROUTES.Governance.Home, ROUTES.Governance.Space, ROUTES.Governance.Proposal]}
                                render={(routeProps) => (
                                    <Suspense fallback={<Loader />}>
                                        <DappLayout>
                                            <Governance {...routeProps} />
                                        </DappLayout>
                                    </Suspense>
                                )}
                            />
                        </Switch>
                    </Router>
                </QueryClientProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;