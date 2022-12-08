import { useQuery } from '@apollo/client';

import { CompanyInfoCard } from '@/shared-components/company-info-card';
import { GET_COMPANY } from '@/graphql/company';
import { getCookie } from '@/utils/cookies';
import Menus from './Menus';

type CompanyLayoutProps = {
	children: React.ReactNode;
	companySlug: string;
};

//  w-[400px]
const CompanyLayout = (props: CompanyLayoutProps) => {
	const { children, companySlug } = props;
	const cookie = getCookie('CONNYCT_USER');
	const { company } = cookie ?? {};
	const { data } = useQuery(GET_COMPANY, {
		variables: { id: companySlug || (!!company ? company[0]?.id : '') },
	});

	return (
		<main className='relative top-16'>
			<section className='flex flex-col'>
				<Menus data={data} />
				<div className='bg-slate-50 container grid mx-auto pt-4 md:grid-cols-4'>
					<CompanyInfoCard companySlug={companySlug} data={data} />
					<section className='pt-4 md:col-span-3 md:pt-0'>{children}</section>
				</div>
			</section>
		</main>
	);
};

export { CompanyLayout };
