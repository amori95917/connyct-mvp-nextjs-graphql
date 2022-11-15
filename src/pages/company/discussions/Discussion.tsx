import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiCommentDetail, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

type Comment = {
	id: number;
	text: string;
};
type Discussion = {
	id: number;
	title: string;
	vote: number;
	description: string;
	comments: Comment;
};
type DiscussionProps = {
	discussion: Discussion;
	companySlug: string;
};

const Discussion = (props: DiscussionProps) => {
	const { discussion, companySlug } = props;
	const [vote, setVote] = useState(20);

	const handelVoteUp = () => {
		setVote(vote + 1);
	};
	const handelVoteDown = () => {
		setVote(vote - 1);
	};
	return (
		<>
			{/* <div className='mt-4 p-4'>
				<div className='flex gap-1 title-vote-block'>
					<div className='bg-primary/75 flex h-10 items-center justify-center mr-2 p-2 vote w-10 hover:bg-primary'>
						<span className='text-white'>{discussion.vote || 0}</span>
					</div>
					<div className='flex flex-col'>
						<span className='cursor-pointer font-semibold text-lg'>{discussion.title}</span>
						<div className='flex gap-1 meta-info'>
							<span className='font-semibold pr-4 text-slate-600 text-sm'>Kiran</span>
							<span className='pr-4 text-slate-500 text-sm'>Oct 14, 2022</span>
							<span className='text-slate-500 text-sm'>20 Replies</span>
						</div>
					</div>
				</div>
			</div> */}

			{/* my design */}
			<div className='bg-white flex gap-4 p-3 rounded-md'>
				<div className='flex flex-col items-center justify-center px-5'>
					<button className='p-4 text-slate-600 hover:text-blue-600' onClick={handelVoteUp}>
						<BiUpArrowAlt size={40} />
					</button>
					<span className='text-2xl text-primary'>{vote}</span>
					<button className='p-4 text-slate-600 hover:text-rose-600' onClick={handelVoteDown}>
						<BiDownArrowAlt size={40} />
					</button>
				</div>
				<div className='flex flex-col px-4'>
					<div className='flex flex-col'>
						<Link
							href={`/company/${companySlug}/discussion/${discussion.id}`}
							passHref
							key={discussion.id}>
							<div className='py-3'>
								<span className='cursor-pointer font-semibold text-lg'>{discussion.title}</span>
							</div>
						</Link>
						<div className='pb-4'>
							<p className='text-slate-600'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas neque dolore, maxime expedita
								beatae accusantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
								praesentium repudiandae. Dignissimos eos doloribus commodi!
							</p>
						</div>
						<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
					</div>
					<div className='flex justify-between'>
						<div className='flex gap-2 items-center'>
							<div className='cursor-pointer h-8 relative rounded-full w-8'>
								<Image
									src='https://i.pravatar.cc/100'
									alt=''
									className='rounded-full'
									width='50'
									height='50'
								/>
							</div>
							<span className='cursor-pointer text-slate-600 text-sm'>
								Posted by <span className='text-primary'>Kiran</span>
							</span>
						</div>
						<div>
							<span className='text-slate-600'>3h ago</span>
						</div>
						<div className='flex gap-3'>
							<div className='flex gap-1 items-center'>
								<span>
									<BiCommentDetail fill='#50c7a6' />
								</span>
								<span>50+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Discussion;
