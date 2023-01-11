import { User } from '@/generated/graphql';
import { StaffList } from '@/shared-components/staffs';
import { Suspense } from 'react';

type StaffsProps = {
	companySlug: string;
	authorizedUser: User;
};

const Staffs = (props: StaffsProps) => {
	const { companySlug, authorizedUser } = props;
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<StaffList companySlug={companySlug} authorizedUser={authorizedUser} />
			</Suspense>
		</>
	);
};

export default Staffs;
