import { gql } from '@apollo/client';

export const GET_TAGS = gql`
	query getTags($paginate: PaginationArgs, $order: OrderTagList, $query: TagQuery) {
		getTags(paginate: $paginate, order: $order, query: $query) {
			edges {
				cursor
				node {
					id
					name
				}
			}
			nodes {
				id
				name
			}
			totalCount
			hasNextPage
		}
	}
`;
