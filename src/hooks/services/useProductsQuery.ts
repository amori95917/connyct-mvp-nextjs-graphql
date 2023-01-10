import { GET_PRODUCTS_BY_BRAND } from '@/graphql/product/resolver';
import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

export function useProductsByBrandQuery(companySlug: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_PRODUCTS_BY_BRAND, {
		fetchPolicy: 'cache-and-network',
		variables: {
			companyId: companySlug,
			first,
		},
	});

	// const feeds = useMemo(() => data?.postsByCompanyId?.edges ?? [], [data]);
	const response = data?.productFindAll?.edges ?? [];
	const hasNextPage = data?.productFindAll?.pageInfo?.hasNextPage;
	const after = data?.productFindAll?.pageInfo?.endCursor;

	useEffect(() => {
		const currentObserver = observerRef?.current;
		if (buttonRef) {
			currentObserver?.observe(document.querySelector('#buttonLoadMore'));
		}
	}, [buttonRef]);

	const onLoadMore = () => {
		if (fetchMore) {
			fetchMore({
				variables: {
					companyId: companySlug,
					after,
				},
			});
		}
	};

	return {
		response,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
