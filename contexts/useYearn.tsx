import React, {createContext, useContext} from 'react';
import axios from 'axios';
import useSWR from 'swr';

import type {TYDaemonPricesWrapper, TYDaemonTokensWrapper} from 'types/types.d';

export type	TYearnContext = {
	prices: TYDaemonPricesWrapper,
	tokens: TYDaemonTokensWrapper,
}
const	defaultProps: TYearnContext = {
	tokens: {},
	prices: {}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseFetcher = async (url: string): Promise<any> => axios.get(url).then((res): any => res.data);

const	YearnContext = createContext<TYearnContext>(defaultProps);
export const YearnContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	/* 🔵 - Yearn Finance ******************************************************
	**	We will play with the some Yearn vaults. To correctly play with them,
	**	we need to fetch the data from the API, especially to get the
	**	apy.net_apy
	***************************************************************************/
	const	{data: prices} = useSWR(`${process.env.YDAEMON_BASE_URI}/1/prices/all`, baseFetcher);
	const	{data: tokens} = useSWR(`${process.env.YDAEMON_BASE_URI}/1/tokens/all`, baseFetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<YearnContext.Provider
			value={{
				prices,
				tokens
			}}>
			{children}
		</YearnContext.Provider>
	);
};


export const useYearn = (): TYearnContext => useContext(YearnContext);
export default useYearn;