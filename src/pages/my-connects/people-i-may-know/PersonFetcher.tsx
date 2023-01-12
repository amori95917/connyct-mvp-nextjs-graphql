import { useMutualUsersQuery } from '@/hooks/services/useMutualUsers';
import { DataComponent } from '@/shared-components/data-component';
import Person from './Person';

const PersonFetcher = () => {
	const { response } = useMutualUsersQuery(6);
	return (
		<>
			<DataComponent data={response}>
				{(response || []).map((mutualUserNode: any) => {
					const { node } = mutualUserNode;
					if (node) {
						return <Person key={node.id} user={node} />;
					}
				})}
			</DataComponent>
		</>
	);
};

export default PersonFetcher;
