import {ReactElement} from 'react';
import {BigNumber} from 'ethers';

export type TYearnVaultWrapper = {
	[key: string]: TYearnVault | undefined
}

export type TYearnVault = {
    inception: number,
    address: string,
    symbol: string,
    display_symbol: string,
    formated_symbol: string,
    name: string,
    display_name: string,
    formated_name: string,
    icon: string,
    token: {
        address: string,
        name: string,
        display_name: string,
        symbol: string,
        description: string,
        decimals: number,
        icon: string,
    },
    tvl: {
        total_assets: string,
        tvl: number,
        price: number
    },
    apy: {
        type: string,
        gross_apr: number,
        net_apy: number,
        fees: {
            performance: number,
            withdrawal: number,
            management: number,
            keep_crv: number,
            cvx_keep_crv: number
        },
        points: {
            week_ago: number,
            month_ago: number,
            inception: number,
        },
        composite: {
            boost: number,
            pool_apy: number,
            boosted_apr: number,
            base_apr: number,
            cvx_apr: number,
            rewards_apr: number
        }
    },
    strategies: [{
		address: string,
		name: string,
		description: string,
    }],
	details: {
		management: string,
		governance: string,
		guardian: string,
		rewards: string,
		depositLimit: string,
		comment: string,
		apyTypeOverride: string,
		apyOverride: number,
		performanceFee: number,
		managementFee: number,
		depositsDisabled: boolean,
		withdrawalsDisabled: boolean,
		allowZapIn: boolean,
		allowZapOut: boolean,
		retired: boolean
	},
    endorsed: boolean,
    version: string,
    decimals: number,
    type: string,
    emergency_shutdown: boolean,
    updated: number,
    migration: {
        available: boolean,
        address: string,
    }
}

export type	TClaimable = {
	raw: BigNumber,
	normalized: number,
}

export type TDropdownOption = {
	icon?: ReactElement;
	label: string;
	value: string;
	zapVia?: string;
};

export type TDropdownProps = {
	options: TDropdownOption[];
	defaultOption: TDropdownOption;
	selected: TDropdownOption;
	placeholder?: string;
	onSelect:
		| React.Dispatch<React.SetStateAction<TDropdownOption>>
		| ((option: TDropdownOption) => void);
};

export type	TNormalizedBN = {
	raw: BigNumber,
	normalized: number | string,
}

export type TYDaemonHarvests = {
	vaultAddress: string,
	strategyAddress: string,
	txHash: string,
	timestamp: string,
	profit: string,
	profitValue: number,
	loss: string,
	lossValue: number,
}

export type TYDaemonPricesWrapper = {
	[key: string]: string
}


export type TYDaemonToken = {
	address: string,
	name: string,
	symbol: string,
	price: number,
	decimals: number,
	isVault: boolean,
	display_symbol: string,
	description: string,
	website: string,
	categories: string[],
}
export type TYDaemonTokensWrapper = {
	[key: string]: TYDaemonToken
}

