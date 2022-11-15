import React, {createContext, useContext} from 'react';
import useSWR from 'swr';
import {useWeb3} from '@yearn-finance/web-lib/contexts';
import	{request} from 'graphql-request';


export type	TGobblersContext = {
	gobblers: any[],
	refresh: VoidFunction
}
const	defaultProps: TGobblersContext = {
	gobblers: [],
	refresh: async (): Promise<void> => undefined
};

const graphFetcher = async (url: string, query: string): Promise<any> => request(url, query);

const	GobblersContext = createContext<TGobblersContext>(defaultProps);
export const GobblersContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	const	{address} = useWeb3();

	const	{data: gobblersData} = useSWR(address ? [
		'https://api.thegraph.com/subgraphs/name/gooberxyz/art-gobblers-mainnet',
		`{
			erc721Tokens(where: {owner: "${(process.env.USER || address).toLowerCase()}"}) {
				identifier
				uri
			}
		}`
	] : null, graphFetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<GobblersContext.Provider
			value={{
				gobblers: gobblersData?.erc721Tokens || [],
				refresh: async (): Promise<void> => {
					// await getBribes();
				}
			}}>
			{children}
		</GobblersContext.Provider>
	);
};


export const useGobblers = (): TGobblersContext => useContext(GobblersContext);
export default useGobblers;