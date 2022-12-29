import { useQuery } from '@apollo/client';

import { User } from '@/generated/graphql';
import { GET_COMPANY } from '@/graphql/company';
import { CompanyInfoCard } from '@/shared-components/company-info-card';
import { UserProfileCard } from '@/shared-components/user-profile-card';
import Menus from './Menus';

type CompanyLayoutProps = {
	children: React.ReactNode;
	companySlug: string;
	user: User;
};

//  w-[400px]
const CompanyLayout = (props: CompanyLayoutProps) => {
	const { children, companySlug, user } = props;
	const { data } = useQuery(GET_COMPANY, {
		variables: { id: companySlug },
	});

	return (
		<main className='relative top-16'>
			<section className='flex flex-col'>
				<Menus data={data} />
				<div className='bg-slate-50 container grid mx-auto pt-4 md:grid-cols-4'>
					{user?.activeRole?.name === 'USER' ? (
						<UserProfileCard />
					) : (
						<CompanyInfoCard companySlug={companySlug} data={data} />
					)}
					<section className='pt-4 md:col-span-3 md:pt-0'>{children}</section>
				</div>
			</section>
		</main>
	);
};

export { CompanyLayout };
