import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/client';

import { GET_COMPANY } from '@/graphql/company';
import { EditMenu } from '@/pages/company/edit/EditMenu';

import Menus from '../CompanyLayout/Menus';

import { CompanyEditLayoutProps } from './types';

const CompanyEditLayout = (props: CompanyEditLayoutProps) => {
	const { children, companySlug, type } = props;
	const { data } = useQuery(GET_COMPANY, {
		variables: { id: companySlug },
	});

	/** TODO: Proper implementation of react clone element to call the children to provide data  */

	return (
		<main className='px-2 relative top-16'>
			<section className='flex flex-col'>
				<Menus data={data} />
				<section className='md:pt-0'>
					<EditMenu companySlug={companySlug} data={data} type={type}>
						{typeof children === 'function' ? children(data) : children}
					</EditMenu>
				</section>
			</section>
		</main>
	);
};

export { CompanyEditLayout };
