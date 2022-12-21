import { gql } from '@apollo/client';

// const USER_FRAGMENT =  gql`
//   fragment UserFragment on User {
//     id
//     createdAt
//     updatedAt
//     firstName
//     lastName
//     email
//     isValid
//     isSuperuser
//     confirm
//     emailToken
//     posts {

//     }
//     company {

//     }
//     isAdmin
//   }
// `

// const AUTH_FRAGMENT = gql`
// fragment AuthFragment on Auth {
//   accessToken
//   refreshToken
//   user {
//     ...UserFragment
//   }
//   role
//   company {

//   }
// }
// ${USER_FRAGMENT}
// `

const SIGNUP_MUTATION = gql`
	mutation signup($data: SignupInput!) {
		signup(data: $data) {
			accessToken
			refreshToken
			role
			company {
				id
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
				fullName
				email
				isValid
				isAdmin
			}
		}
	}
`;

const LOGIN_MUTATION = gql`
	mutation login($data: LoginInput!) {
		login(data: $data) {
			accessToken
			refreshToken
			role
			company {
				id
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
			}
		}
	}
`;

export { SIGNUP_MUTATION, LOGIN_MUTATION };
