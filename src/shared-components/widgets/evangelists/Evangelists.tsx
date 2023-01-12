import { Suspense } from 'react';
import EvangelistFetcher from './EvangelistFetcher';

type EvangelistsProps = {
	first?: number;
};

const Evangelists = (props: EvangelistsProps) => {
	const { first = 3 } = props;
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<EvangelistFetcher first={first} />
			</Suspense>
		</>
	);
};

export default Evangelists;
