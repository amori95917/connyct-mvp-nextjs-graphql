import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HashTag } from '@/shared-components/hash-tag';

const HashTagPopup = React.forwardRef(({ setShowHashTagPopup, setHashTags, hashTags }, ref) => {
	const onSubmit = e => {
		e.preventDefault();
		setHashTags([...hashTags, e.target[0].value]);
		document.getElementById('hash-tag-form-id').reset();
	};

	const onDeleteRecentTag = tag => {
		var filtered = hashTags.filter(function (value, index, arr) {
			return value !== tag;
		});
		setHashTags([...filtered]);
	};

	return (
		<>
			<div className='items-center justify-center popup'>
				<div ref={ref} className='bg-white h-128 relative rounded-md w-129'>
					<div className='bg-primary flex justify-between p-2 px-5 rounded-t-md text-white text-xl'>
						<span>Create Hash-Tag</span>
						<button
							onClick={() => {
								setShowHashTagPopup(false);
							}}>
							<AiOutlineClose size={25} />
						</button>
					</div>
					<div className='flex ml-5 mt-5 w'>
						<span className='mr-3 text-3xl text-gray-500'>#</span>
						<form onSubmit={onSubmit} id='hash-tag-form-id'>
							<input
								type='text'
								className='bg-gray-200 h-10 pl-3 rounded-md'
								placeholder='tag'
								required={true}
							/>
							<button className='bg-primary h-10 ml-3 p-1 rounded-md text-white w-24' type='submit'>
								Ok
							</button>
						</form>
					</div>
					<div className='flex h-24 items-center ml-5 pt-5 w-full'>
						{hashTags?.map((tag, index) => {
							return (
								// <span key={index}>
								// 	{tag}
								// 	<button type='button' onClick={onDeleteRecentTag}>
								// 		<AiOutlineClose />
								// 	</button>
								// </span>
								<div key={index} className='flex ml-3'>
									<HashTag text={tag} />
									<button type='button' onClick={() => onDeleteRecentTag(tag)} className='-ml-2 mb-2'>
										<AiOutlineClose size={28} />
									</button>
								</div>
							);
						})}
					</div>
					<div className='h-28 ml-5'>
						<span className='text-2xl'>Trending Tags</span>
					</div>
					<div className='flex justify-center mt-8'>
						<button
							onClick={() => setShowHashTagPopup(false)}
							className='bg-primary h-10 p-2 rounded-md text-white w-24'>
							Done
						</button>
					</div>
				</div>
			</div>
		</>
	);
});

HashTagPopup.displayName = 'HashTagPopup';

export { HashTagPopup };
