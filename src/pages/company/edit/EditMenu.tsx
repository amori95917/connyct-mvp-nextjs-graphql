import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { EditMenuProps } from './types';
import { isEnabled } from './common/functions';

const EditMenu: React.FC<EditMenuProps> = props => {
	const router = useRouter();

	const { companySlug, children, type, data } = props;

	const childrenWithProps = React.Children.map(children, (child, i) => {
		return React.cloneElement(child, {
			companySlug,
		});
	});

	return (
		<>
			<div className='flex flex-col mt-0 md:flex-row md:gap-3'>
				<div className='bg-primaryv2 p-4 text-white w-full md:basis-1/6'>
					<Link href={`/company/${companySlug}/edit/business-information/general`} passHref>
						<button className='mt-4 pb-4 text-left text-lg w-full whitespace-nowrap hover:font-bold'>
							Business Information
						</button>
					</Link>
					<Link href={`/company/${companySlug}/edit/account/`}>
						<button className='py-4 text-left text-lg w-full hover:font-bold'>Account</button>
					</Link>
					<Link href={`/company/${companySlug}/edit/security/`}>
						<button className='py-4 text-left text-lg w-full hover:font-bold'>Security</button>
					</Link>
				</div>
				{type === 'business-information' && (
					<div className='mt-4 text-left w-full md:basis-1/4'>
						{/** TODO: find which button is active and activate the sub-menus accordingly */}
						<Link href={`/company/${companySlug}/edit/business-information/general`} passHref>
							<button className='font-bold p-2 text-gray-600 text-left text-md w-full'>General</button>
							<p className='p-2 text-gray-400'>
								Fill out the general information which is must for better visibility
							</p>
						</Link>
						<Link
							className={isEnabled(data) ? '' : 'pointer-events-none'}
							href={`/company/${companySlug}/edit/business-information/documents`}>
							<button
								className={`flex font-bold items-center p-2 text-gray-600 text-left text-md w-full ${
									isEnabled(data) ? '' : 'text-slate-300'
								}`}>
								Documents
							</button>
							<p className='p-2 text-gray-400'>
								Fill out the document information so that we can list you as a verified company
							</p>
						</Link>
						<Link
							className={isEnabled(data) ? '' : 'pointer-events-none'}
							href={`/company/${companySlug}/edit/business-information/branches`}>
							<button
								className={`flex font-bold items-center p-2 text-gray-700 text-left text-md w-full ${
									isEnabled(data) ? '' : 'text-slate-300'
								}`}>
								Branches
							</button>
							<p className='p-2 text-gray-400'>
								Fill out the branch information so that user can be familiar to other branch office of your
								company
							</p>
						</Link>
					</div>
				)}
				<div className='bg-white mt-4 p-10 pt-2 w-full'>{childrenWithProps}</div>
			</div>
		</>
	);
};

export { EditMenu };
