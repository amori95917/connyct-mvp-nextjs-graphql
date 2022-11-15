import React from 'react';
import { Maybe, CompanyEdge, Company } from '@/generated/graphql';

interface companyDataTypes extends CompanyEdge {
	getCompanyById: Maybe<Company>;
}

export type EditMenuProps = {
	companySlug: string;
	children: React.ReactNode;
	type?: string;
	data?: companyDataTypes;
};
