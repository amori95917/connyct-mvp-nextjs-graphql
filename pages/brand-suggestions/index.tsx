import { CompanySuggestions } from '@/pages/company-suggestions';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { HeaderLayout } from '@/shared-components/layouts';

// TODO: only for a consumer not for companies
const SuggestionsPage = () => {
	return (
		<>
			<AuthorizationWrapper allowedRoles={['USER']}>
				<HeaderLayout accessTo={['USER']}>
					<CompanySuggestions />
				</HeaderLayout>
			</AuthorizationWrapper>
		</>
	);
};

export default SuggestionsPage;
