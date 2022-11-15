import {ethers} from 'ethers';
import {toAddress} from '@yearn-finance/web-lib/utils';
import {TNormalizedBN} from 'types/types.d';

export function allowanceKey(token: unknown, spender: unknown): string {
	return `${toAddress(token as string)}_${toAddress(spender as string)}`;
}

export function handleInputChange(
	e: React.ChangeEvent<HTMLInputElement>,
	decimals: number
): TNormalizedBN {
	let		amount = e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
	const	amountParts = amount.split('.');
	if (amountParts.length === 2) {
		amount = amountParts[0] + '.' + amountParts[1].slice(0, decimals);
	}
	const	raw = ethers.utils.parseUnits(amount || '0', decimals);
	return ({raw: raw, normalized: amount});
}

