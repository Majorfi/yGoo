import React, {createContext, ReactElement, useContext} from 'react';
import {BigNumber} from 'ethers';
// eslint-disable-next-line import/no-named-as-default
import {useWeb3} from '@yearn-finance/web-lib/contexts';
import {useBalances} from '@yearn-finance/web-lib/hooks';
import {providers} from '@yearn-finance/web-lib/utils';
import {useYearn} from 'contexts/useYearn';
import {ETH_TOKEN_ADDRESS} from 'utils/constants';


export type	TBalances = {
	[address: string]: {
		decimals: number,
		symbol: string,
		raw: BigNumber,
		rawPrice: BigNumber,
		normalized: number,
		normalizedPrice: number,
		normalizedValue: number
	}
}

export type	TWalletContext = {
	balances: TBalances,
	refresh: () => Promise<void>
}

const	defaultProps = {
	balances: {},
	refresh: async (): Promise<void> => undefined
};

/* 🔵 - Yearn Finance **********************************************************
** This context controls most of the user's wallet data we may need to
** interact with our app, aka mostly the balances and the token prices.
******************************************************************************/
const	WalletContext = createContext<TWalletContext>(defaultProps);
export const WalletContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const	{provider} = useWeb3();
	const	{prices} = useYearn();

	const	{data: balances, update: updateBalances} = useBalances({
		key: 'nonce',
		provider: provider || providers.getProvider(1),
		tokens: [
			{for: process.env.USER, token: ETH_TOKEN_ADDRESS},
			{for: process.env.USER, token: process.env.GOO_TOKEN_ADDRESS as string}
		],
		prices,
		effectDependencies: []
	});


	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<WalletContext.Provider
			value={{
				balances: balances,
				refresh: async (): Promise<void> => {
					await Promise.all([updateBalances()]);
				}
			}}>
			{children}
		</WalletContext.Provider>
	);
};


export const useWallet = (): TWalletContext => useContext(WalletContext);
export default useWallet;