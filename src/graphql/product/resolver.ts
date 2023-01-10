import { gql } from '@apollo/client';

export const CATEGORY_FRAGMENT = gql`
	fragment ProductCategoryFragment on ProductCategory {
		id
		createdAt
		updatedAt
		name
		parentId
		description
		image
		isRoot
		isLeaf
		level
	}
`;

export const CATEGORY_FRAGMENT_WITH_SUBCATEGORIES = gql`
	fragment ProductCategoryFragmentWithSubCategories on ProductCategory {
		...ProductCategoryFragment
		subCategory {
			...ProductCategoryFragment
		}
	}
	${CATEGORY_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = gql`
	fragment ProductFragment on Product {
		id
		sku
		productName
		slug
		price
		companyId
		categoryId
		category {
			id
			name
		}
		productMedia {
			id
			mediaUrl
		}
		createdAt
		updatedAt
	}
`;

export const ROOT_CATEGORIES = gql`
	query rootCategory {
		rootCategory {
			...ProductCategoryFragment
		}
	}
	${CATEGORY_FRAGMENT}
`;

export const SUB_CATEGORIES = gql`
	query subCategoryList($parentId: String!) {
		subCategoryList(parentId: $parentId) {
			...ProductCategoryFragmentWithSubCategories
		}
	}
	${CATEGORY_FRAGMENT_WITH_SUBCATEGORIES}
`;

export const GET_PRODUCTS_BY_BRAND = gql`
	query productFindAll(
		$companyId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListProduct
	) {
		productFindAll(
			companyId: $companyId
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
		) {
			data {
				edges {
					node {
						...ProductFragment
					}
					cursor
				}
				pageInfo {
					startCursor
					endCursor
					hasPreviousPage
					hasNextPage
				}
				totalCount
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;
