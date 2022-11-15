import React, {ReactElement} from 'react';

export default function Wrapper({children}: {children: ReactElement}): ReactElement {
	return (
		<>
			{children}
		</>
	);
}