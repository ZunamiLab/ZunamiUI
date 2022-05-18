const root = 'https://zunami-reward-api.herokuapp.com/api';
export const poolStatsUrl = `${root}/pool/stats`;
export const zunamiInfoUrl = `${root}/zunami/info`;

export const historicalApyUrl = `${root}/zunami/apy-chart`;
export const testnetUrl = `${root}/feature`;
export const totalIncomeUrl = `${root}/transfers/total-income`;
export const transHistoryUrl = `${root}/transfers/history`;

export const getPoolStatsUrl = (poolTypes: string): string => {
    return poolStatsUrl + '?types=' + poolTypes;
};

export const getHistoricalApyUrl = (period: string): string => {
    return `${historicalApyUrl}?period=${period.toUpperCase()}`;
};

export const getTestnetStatusUrl = (address: string): string => {
    return `${testnetUrl}?address=${address}`;
};

export const getTotalIncomeUrl = (address: string, lpTokens: string): string => {
    return `${totalIncomeUrl}?address=${address.toLowerCase()}&lpTokens=${lpTokens}`;
};

export const getTransHistoryUrl = (
    address: string,
    type: string,
    page: number = 0,
    size: number = 5
): string => {
    return `${transHistoryUrl}?address=${address.toLowerCase()}&type=${type}&page=${page}&size=${size}`;
};
