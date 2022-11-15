import React, {ReactElement} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@yearn-finance/web-lib/components';
import {format, toAddress} from '@yearn-finance/web-lib/utils';
import Wrapper from 'components/apps/ygoo/Wrapper';
import {useGobblers} from 'contexts/useGobblers';
import {useWallet} from 'contexts/useWallet';

function	Index(): ReactElement {
	const	{balances} = useWallet();
	const	{gobblers} = useGobblers();

	console.log(gobblers);

	return (
		<>
			<div className={'mt-8 mb-10 w-full max-w-6xl text-center'}>
				<b className={'text-center text-lg md:text-2xl'}>{'Squirt me daddy'}</b>
				<p className={'mt-8 whitespace-pre-line text-center text-base text-neutral-600'}>
					{'Feed me. Gobe me. Fill me with your Goo. '}
				</p>
			</div>
			<div className={'mb-10 flex flex-row items-center justify-center space-x-4 md:mb-0 md:space-x-10'}>
				<Link
					href={'https://dao.curve.fi/gaugeweight'}
					target={'_blank'}
					className={'w-full md:w-auto'}>
					<Button className={'w-40'}>
						{'Wrap'}
					</Button>
				</Link>
				<Link href={'/offer-bribe'} className={'w-full md:w-auto'}>
					<Button className={'w-40'}>
						{'Unwrap'}
					</Button>
				</Link>
			</div>
			<div className={'mt-20 grid grid-cols-3 gap-10'}>
				<div className={'col-span-3 flex w-full flex-col items-center border-2 border-neutral-0 bg-neutral-100 p-6'}>
					<b className={'text-lg'}>{'Wrap me tight daddy'}</b>
					<p className={'py-6 text-center text-xl'}>{`Squeeze my ${format.amount(balances[toAddress(process.env.GOO_TOKEN_ADDRESS)]?.normalized, 2, 2)} Goo`}</p>
					<div className={'mt-auto'}>
						<Button>
							{'Oh yes, wrap them'}
						</Button>
					</div>
				</div>
				{gobblers.map((gobbler): ReactElement => (
					<div
						key={gobbler.identifier}
						className={'flex w-full flex-col items-center border-2 border-neutral-0 bg-neutral-100'}>
						<div>
							<Image
								src={`https://storage.googleapis.com/gobblers.artgobblers.com/gifs/${gobbler.identifier}.gif`}
								alt={gobbler.identifier}
								width={1000}
								height={1000}
								style={{objectFit: 'cover'}} />
						</div>
						<div className={'p-6'}>
							<b>
								{`Wrap ${gobbler.identifier}`}
							</b>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

Index.getLayout = function getLayout(page: ReactElement): ReactElement {
	return <Wrapper>{page}</Wrapper>;
};

export default Index;