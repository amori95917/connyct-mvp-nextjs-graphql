import { Company, User } from '@/generated/graphql';

const hasCompanySlugMatched = (brandIdToMatch: string, brand: [Company]) => {
	return brand.some(b => b.id === brandIdToMatch);
};

const hasOwnerIdMatched = (ownerIdToMatch: string, brand: [Company]) => {
	return brand.some(b => b.ownerId === ownerIdToMatch);
};

const isOwner = (currentUser: User, companySlug: string) => {
	/* MANAGER, EDITOR can also view it where we need to check brandId and currentUser company id are same */
	return (
		getUserRoleName(currentUser) === 'OWNER' &&
		hasCompanySlugMatched(companySlug, currentUser?.company) &&
		hasOwnerIdMatched(currentUser?.id, currentUser?.company)
	);
};

const getUserRoleName = (currentUser: User) => {
	if (currentUser?.activeRole) return currentUser?.activeRole.name;
};

const getUserRoleId = (currentUser: User) => {
	if (currentUser?.activeRole) return currentUser?.activeRole.id;
};

const getUserImageFromRole = (currentUser: User) => {
	return getUserRoleName(currentUser) === 'USER'
		? currentUser?.userProfile?.profileImage
		: currentUser?.company[0]?.avatar;
};

const getUserNameFromRole = (currentUser: User) => {
	return getUserRoleName(currentUser) === 'USER'
		? currentUser?.username
		: currentUser?.company[0]?.name;
};

const getUserFullNameFromRole = (currentUser: User) => {
	return getUserRoleName(currentUser) === 'USER'
		? currentUser?.fullName
		: currentUser?.company[0]?.legalName;
};

export {
	hasCompanySlugMatched,
	hasOwnerIdMatched,
	isOwner,
	getUserRoleName,
	getUserRoleId,
	getUserImageFromRole,
	getUserNameFromRole,
	getUserFullNameFromRole,
};
