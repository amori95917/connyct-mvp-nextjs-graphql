import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
	mutation productCreate($input: ProductInput!, $companyId: String!) {
		productCreate(input: $input, companyId: $companyId) {
			data {
				id
				sku
				productName
				slug
				description
				price
				companyId
				categoryId
				productTypeId
			}
		}
	}
`;
