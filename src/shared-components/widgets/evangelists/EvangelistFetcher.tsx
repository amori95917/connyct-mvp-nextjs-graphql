import { useMutualUsersQuery } from '@/hooks/services/useMutualUsers';
import { DataComponent } from '@/shared-components/data-component';
import Evangelist from './Evangelist';

type EvangelistFetcherProps = {
	first?: number;
};

const EvangelistFetcher = (props: EvangelistFetcherProps) => {
	const { first = 3 } = props;
	const { response } = useMutualUsersQuery(first);
	return (
		<DataComponent data={response}>
			{(response || []).map((mutualUserNode: any) => {
				const { node } = mutualUserNode;
				if (node) {
					return <Evangelist key={node.id} item={node} />;
				}
			})}
		</DataComponent>
	);
};

export default EvangelistFetcher;
