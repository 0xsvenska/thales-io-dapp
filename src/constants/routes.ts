const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Staking: '/staking',
    Bridge: '/bridge',
    LPStaking: '/lp-staking',
    AMMLP: '/amm-lp',
    Governance: {
        Home: '/governance',
        Space: '/governance/:space',
        Proposal: '/governance/:space/:id',
    },
    Whitepaper: '/whitepaper',
};
export default ROUTES;
