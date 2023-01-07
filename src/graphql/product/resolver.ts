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
