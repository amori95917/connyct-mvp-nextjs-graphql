import { useRef, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
	COMMUNITY_POLICIES,
	COMMUNITY_POLICY,
	CREATE_COMMUNITY_POLICY,
	UPDATE_COMMUNITY_POLICY,
	DELETE_COMMUNITY_POLICY,
} from '@/graphql/community';

export function useCommunityPoliciesQuery(communityId: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(COMMUNITY_POLICIES, {
		variables: {
			communityId,
			first,
		},
	});

	const response = data?.getCommunityPolicies?.data?.edges ?? [];
	const hasNextPage = data?.getCommunityPolicies?.data?.pageInfo?.hasNextPage;
	const after = data?.getCommunityPolicies?.data?.pageInfo?.endCursor;

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
					communityId,
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

export function useCommunityPolicyQuery(policyId: string) {
	const { data, loading } = useQuery(COMMUNITY_POLICY, {
		variables: {
			id: policyId,
		},
	});
	const response = data?.getCommunityPolicy ?? null;
	return { response, loading };
}

export function useCommunityPolicyCreateMutation() {
	const [createCommunityPolicy, { loading, error }] = useMutation(CREATE_COMMUNITY_POLICY);
	return { createCommunityPolicy, loading, error };
}

export function useCommunityPolicyUpdateMutation() {
	const [updateCommunityPolicy, { loading, error }] = useMutation(UPDATE_COMMUNITY_POLICY);
	return { updateCommunityPolicy, loading, error };
}

export function useCommunityPolicyDeleteMutation() {
	const [deleteCommunityPolicy, { loading, error }] = useMutation(DELETE_COMMUNITY_POLICY);
	return { deleteCommunityPolicy, loading, error };
}
