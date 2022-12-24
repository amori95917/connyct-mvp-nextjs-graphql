import { gql } from '@apollo/client';

export const AUTH_FRAGMENT = gql`
	fragment AuthFragment on Auth {
		accessToken
		refreshToken
		company {
			id
			name
			legalName
			avatar
			companyStage
			isActive
			isVerified
			ownerId
			followers
			accountStatus
			reason
		}
		user {
			id
			email
			username
			isValid
			isEmailVerified
			userProfile {
				id
				profileImage
			}
			roles {
				id
				name
			}
			activeRole {
				id
				name
			}
		}
	}
`;

const SIGNUP_MUTATION = gql`
	mutation signup($data: SignupInput!) {
		signup(data: $data) {
			...AuthFragment
		}
	}
	${AUTH_FRAGMENT}
`;

const LOGIN_MUTATION = gql`
	mutation login($data: LoginInput!) {
		login(data: $data) {
			...AuthFragment
		}
	}
	${AUTH_FRAGMENT}
`;

const SWITCH_ACCOUNT = gql`
	mutation switchAccount($input: SwitchAccountInput!) {
		switchAccount(input: $input) {
			...AuthFragment
		}
	}
	${AUTH_FRAGMENT}
`;

export { SIGNUP_MUTATION, LOGIN_MUTATION, SWITCH_ACCOUNT };
