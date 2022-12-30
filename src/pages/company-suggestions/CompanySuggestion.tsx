import { Company, Maybe } from '@/generated/graphql';
import Image from 'next/image';

type CompanySuggestionProps = {
	company: Maybe<Company> | undefined;
	followedCompanies: Array<string>;
	handleFollow: (companyId: string) => void;
	handleUnfollow: (companyId: string) => void;
};

const CompanySuggestion = (props: CompanySuggestionProps) => {
	const { company, followedCompanies, handleFollow, handleUnfollow } = props;
	return (
		<>
			{company ? (
				<>
					<div key={company.id} className='flex items-center justify-between mt-5 w-full'>
						<div className='flex items-center w-full'>
							<div className='h-16 overflow-hidden relative rounded-full w-16'>
								<Image
									className='h-16 rounded-full w-16'
									src={`https://i.pravatar.cc/`}
									alt='Sunset in the mountains'
									fill
								/>
							</div>
							<div className='ml-5'>
								<span className='flex flex-col'>
									<span className='font-bold'> {company.legalName}</span>
									<span className='text-slate-400'>{company.followers || '0'} followers</span>
								</span>
							</div>
						</div>
						<div className='flex justify-end w-full'>
							{followedCompanies?.includes(company.id) ? (
								<button
									onClick={() => handleUnfollow(company.id)}
									className='bg-gray-300 cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'
								>
									Unfollow
								</button>
							) : (
								<button
									onClick={() => handleFollow(company.id)}
									className='bg-primary cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'
								>
									Follow
								</button>
							)}
						</div>
					</div>
				</>
			) : (
				<p>No Company</p>
			)}
		</>
	);
};

export default CompanySuggestion;
