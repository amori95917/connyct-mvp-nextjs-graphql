import { ReactNode } from 'react';
import { Maybe, CompanyEdge } from '@/generated/graphql';

export type CompanyEditLayoutProps = {
	children(data?: Maybe<CompanyEdge>): JSX.Element | ReactNode;
	companySlug: string;
	type?: string;
	data?: Maybe<CompanyEdge> | any;
};
