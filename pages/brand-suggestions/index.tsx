import { CompanySuggestions } from '@/pages/company-suggestions';
import { HeaderLayout } from '@/shared-components/layouts';

// TODO: only for a consumer not for companies
const SuggestionsPage = () => {
	return (
		<>
			<HeaderLayout>
				<CompanySuggestions />
			</HeaderLayout>
		</>
	);
};

SuggestionsPage.auth = true;

export default SuggestionsPage;
