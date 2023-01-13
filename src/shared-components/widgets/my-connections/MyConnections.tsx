import { useUserConnectionsSummary } from '@/hooks/services/useUserConnectionsSummary';
import Link from 'next/link';

const MyConnectionsWidget = () => {
	const { response, loading } = useUserConnectionsSummary();
	if (loading) {
		return <p>Loading...</p>;
	} else {
		const { summary } = response;
		return (
			<div className='bg-white rounded-md'>
				<p className='bg-primary font-bold p-4 rounded-t-md text-lg text-white'>My Connections</p>
				<div className='connection-options'>
					<ul>
						<Link href={'/my-connects/connected-brands'}>
							<li className='flex justify-between p-4 hover:bg-gray-100'>
								<span>Connected Brands</span>
								<span>{summary.connectedBrands || 0}</span>
							</li>
						</Link>
						<Link href={'/my-connects/recommended-brands'}>
							<li className='flex justify-between p-4 hover:bg-gray-100'>
								<span>Recommended Brands</span>
							</li>
						</Link>
						{/* Followers */}
						<Link href={'/my-connects/connycted-evangelists'}>
							<li className='flex justify-between p-4 hover:bg-gray-100'>
								<span>Followers</span>
								<span>{summary.connectedEvangelists || 0}</span>
							</li>
						</Link>
						{/* I am Following to */}
						<Link href={'/my-connects/my-followings'}>
							<li className='flex justify-between p-4 hover:bg-gray-100'>
								<span>My Following</span>
								<span>{summary.connectedEvangelists || 0}</span>
							</li>
						</Link>
						<Link href={'/my-connects/communities'}>
							<li className='flex justify-between p-4 rounded-b-md hover:bg-gray-100'>
								<span>Communities</span>
								<span>{summary.connectedCommunities || 0}</span>
							</li>
						</Link>
					</ul>
				</div>
			</div>
		);
	}
};

export default MyConnectionsWidget;
