import { BigNumber } from 'bignumber.js';

export interface PoolInfo {
    pid: number;
    apr: number;
    apy: number;
    tvlInZunami: number;
    type: string;
}

export interface ChartDataElement {
    title: string;
    link: string;
    color: string;
    value: number;
    tvlInZunami: number;
}

const poolsChartdata: { [key: string]: any } = {
    DUSD: {
        title: 'Convex finance - DUSD pool',
        link: 'https://etherscan.io/address/0x63f920108834672619a8720321422dce79724766',
        color: '#3098F9',
        value: 0,
        icon: '/convex.svg',
    },
    USDN: {
        title: 'Convex finance - USDN pool',
        link: 'https://etherscan.io/address/0xc2bbEDcCE9b54a9F8eaAFf40D1965f9b25B74e66',
        color: '#FA6005',
        value: 0,
        icon: '/convex.svg',
    },
    LUSD: {
        title: 'Convex finance - LUSD pool',
        link: 'https://etherscan.io/address/0x9903ABbd0006350115D15e721f2d7e3eb6f13b97',
        color: '#FFC129',
        value: 0,
        icon: '/convex.svg',
    },
    ANCHOR: {
        title: 'Anchor Protocol - UST pool',
        link: 'https://etherscan.io/address/0x360F8dAdC56717CFB53b03Ff4A570f4FD54e73c3',
        color: '#8DDA2C',
        value: 0,
        icon: '/anchor.svg',
    },
    MIM: {
        title: 'Convex finance - MIM pool',
        link: 'https://etherscan.io/address/0x946C3397D917898Be9034fe8206717ab84c4451a',
        color: '#8DDB2C',
        value: 0,
        icon: '/convex.svg',
    },
    PUSD: {
        title: 'Convex finance - PUSD pool',
        link: 'https://etherscan.io/address/0x7e3e10ea28affd3fc47c5491fef8351acb530d71',
        color: '#FFC129',
        value: 0,
        icon: '/convex.svg',
    },
    USDD: {
        title: 'Convex finance - USDD pool',
        link: 'https://etherscan.io/address/0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6',
        color: '#2cd5db',
        value: 0,
        icon: '/convex.svg',
    },
};

export function poolInfoToChartElement(pool: PoolInfo, percent: BigNumber): ChartDataElement {
    return {
        ...poolsChartdata[pool.type],
        tvlInZunami: pool.tvlInZunami,
        value: new BigNumber(pool.tvlInZunami).dividedBy(percent).toNumber() * 100,
    };
}

export function poolDataToChartData(poolData: Array<PoolInfo>, TVL: BigNumber) {
    return poolData
        .map((pool) => poolInfoToChartElement(pool, TVL))
        .filter((el) => el.value > 0)
        .sort((a, b) => a.tvlInZunami > b.tvlInZunami ? -1 : 1);
}
