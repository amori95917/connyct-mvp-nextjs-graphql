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

export { hasCompanySlugMatched, hasOwnerIdMatched, isOwner, getUserRoleName, getUserRoleId };
