import { Avatar } from '@/shared-components/avatar';
import { ListView } from '@/shared-components/view/list-view';
import { Button } from '@/ui-elements/atoms/button';

type ConnectedEvangelistProps = {
	follower: any;
};
const ConnectedEvangelist = (props: ConnectedEvangelistProps) => {
	const { follower } = props;
	const handleFollow = (followerId: string) => {
		console.log('Follow');
	};
	const handleUnfollow = (followerId: string) => {
		console.log('unfollow');
	};
	return (
		<>
			<div className='flex items-center justify-between mt-5 w-full'>
				<ListView
					data={{
						title: follower.fullName,
						metaTitle: follower.username,
						avatar: follower.userProfile?.profileImage || '',
					}}
					renderActions={() => {
						return (
							<>
								<div className='flex justify-end w-full'>
									<Button
										onClick={() => handleUnfollow(follower.id || '')}
										className='bg-gray-300 cursor-pointer flex flex-col h-10 items-center mr-4 py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
										Unfollow
									</Button>
									<Button
										onClick={() => handleFollow(follower.id || '')}
										className='bg-primary cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
										Follow
									</Button>
								</div>
							</>
						);
					}}
				/>
			</div>
		</>
	);
};

export default ConnectedEvangelist;
