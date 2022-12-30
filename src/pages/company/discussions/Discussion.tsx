import Image from 'next/image';
import Link from 'next/link';
import { UilCommentInfo, UilAngleDown, UilAngleUp } from '@iconscout/react-unicons';
import { formatDistance } from 'date-fns';
// import ReactHtmlParser from 'react-html-p÷arser';

import { CompanyDiscussion, Maybe } from '@/generated/graphql';
import { useDiscussionVote } from './useDiscussionHooks';
import { Avatar } from '@/shared-components/avatar';

type DiscussionProps = {
	discussion: Maybe<CompanyDiscussion> | undefined;
	companySlug: string;
};

const Discussion = (props: DiscussionProps) => {
	const { discussion, companySlug } = props;

	const { handelVoteUp, handelVoteDown } = useDiscussionVote(discussion?.id);
	if (discussion?.id) {
		return (
			<>
				{/* my design */}
				<div className='bg-white flex gap-4 p-3 rounded-md'>
					<div className='flex flex-col items-center justify-center px-5'>
						<button className='p-4 text-slate-600 hover:text-blue-600' onClick={handelVoteUp}>
							<UilAngleUp size={40} />
						</button>
						<span className='font-semibold text-2xl text-primary'>{discussion.upVote}</span>
						<button className='p-4 text-slate-600 hover:text-rose-600' onClick={handelVoteDown}>
							<UilAngleDown size={40} />
						</button>
					</div>
					<div className='flex flex-col grow px-4'>
						<div className='flex flex-col'>
							<Link
								href={`/brand/${companySlug}/discussions/${discussion.id}`}
								passHref
								key={discussion?.id}
							>
								<div className='py-3'>
									<span className='cursor-pointer font-semibold text-lg'>{discussion.title}</span>
								</div>
							</Link>
							<div className='pb-4'>
								<div
									className='text-slate-600'
									dangerouslySetInnerHTML={{ __html: discussion.description || '' }}
								/>
							</div>
							<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
						</div>
						<div className='flex items-center justify-between w-full'>
							<div className='flex gap-2 items-center'>
								<div className='cursor-pointer h-8 relative rounded-full w-8'>
									<Avatar
										imgSrc={discussion.createdBy?.image}
										name={discussion.createdBy?.fullName || ''}
										className='rounded-full'
										size='md'
									/>
								</div>
								<span className='cursor-pointer text-slate-600 text-sm'>
									Posted by <span className='text-primary'>{discussion.createdBy?.fullName}</span>
								</span>
							</div>
							<div>
								<span className='text-slate-600'>
									{formatDistance(new Date(discussion?.createdAt), new Date(), {
										addSuffix: true,
									})}
								</span>
							</div>
							<div className='flex gap-3'>
								<div className='flex gap-1 items-center'>
									<span>
										<UilCommentInfo fill='#50c7a6' />
									</span>
									{/* TODO: total count number of comments/answers to get from api */}
									<span>{0}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Discussion;
