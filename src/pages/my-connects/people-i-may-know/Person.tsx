import Image from 'next/image';

import { User, Maybe } from '@/generated/graphql';
import { Button } from '@/ui-elements/atoms/button';
import { CardView } from '@/shared-components/view/card-view';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER } from '@/graphql/user';

type PersonProps = {
	user: Maybe<User> | undefined;
};

const Person = (props: PersonProps) => {
	const { user } = props;
	const [followUserToUser, { data, loading: submitting }] = useMutation(FOLLOW_USER);
	const handleConnect = async () => {
		console.log('userId', user.id);
		await followUserToUser({
			variables: {
				data: {
					followedToID: user.id,
				},
			},
		});
	};
	return (
		<>
			{user ? (
				<CardView
					avatar={{
						imgSrc: user?.userProfile?.profileImage,
						name: user.fullName || '',
						alt: user.username || user.fullName || '',
						size: 'lg',
					}}
					item={{
						title: user.fullName || '',
						metaTitle: user.username || '',
					}}
					renderActions={() => {
						return (
							<Button className='mt-4' onClick={handleConnect}>
								Connect
							</Button>
						);
					}}
				/>
			) : (
				<p>No User</p>
			)}
		</>
	);
};

export default Person;
