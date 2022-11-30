import { Company } from '@/generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export type DocumentUploadProps = {
	companySlug: string | undefined;
	data: { getCompanyById: Maybe<Company> };
	setIsDrawerOpen: (isDrawerOpen: boolean) => void;
};
