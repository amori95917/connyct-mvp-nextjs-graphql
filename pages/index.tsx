import { useAuth } from '@/contexts/auth';
import { HeaderLayout } from '@/shared-components/layouts';

export default function Home() {
	const { user } = useAuth();
	console.log('user', user);
	return (
		<>
			<HeaderLayout>
				<div className='container mx-auto'>
					<div className='flex flex-col'>
						<div className='w-full'>
							<div className='bg-white p-8 rounded-lg shadow-lg w-1/2'>
								<div className='font-bold mb-4 text-2xl'>Key Stats</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Number of Products/Promotions</div>
										<div className='font-bold text-3xl text-primary'>123</div>
									</div>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>
											Average Views/Clicks per Product/Promotion
										</div>
										<div className='font-bold text-3xl text-primary'>456</div>
									</div>
								</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Number of Interactions/Conversions</div>
										<div className='font-bold text-3xl text-primary'>789</div>
									</div>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Conversion Rate</div>
										<div className='font-bold text-3xl text-primary'>12%</div>
									</div>
								</div>
								<div className='mb-4'>
									<div className='font-bold mb-2 text-gray-800'>Testimonials</div>
									<div className='bg-gray-200 p-4 rounded-lg'>
										<div className='mb-2'>
											&quot;I had great success promoting Brand X&apos;s products on the platform. The
											conversion rate was impressive, and the brand was very supportive throughout the
											process.&quot; - Brand Evangelist A
										</div>
										<div className='mb-2'>
											&quot;I&apos;ve been working with Brand Y for a while now, and they have consistently
											provided high-quality products that my audience loves. I highly recommend them.&quot; -
											Brand Evangelist B
										</div>
									</div>
								</div>
								<div>
									{/* <div className='font-bold mb-2 text-gray-800'>Success Stories</div> */}
									<div className='font-bold mb-4 text-2xl'>Audience Insights</div>
									<div className='flex flex-col mb-4 md:flex-row'>
										<div className='p-2 w-full md:w-1/2'>
											<div className='font-bold mb-2 text-gray-800'>Age Range</div>
											<div className='font-bold text-gray-800 text-lg'>
												18-24 (30%), 25-34 (40%), 35-44 (20%), 45+ (10%)
											</div>
										</div>
										<div className='p-2 w-full md:w-1/2'>
											<div className='font-bold mb-2 text-gray-800'>Gender</div>
											<div className='font-bold text-gray-800 text-lg'>Female (60%), Male (40%)</div>
										</div>
									</div>
									<div className='flex flex-col mb-4 md:flex-row'>
										<div className='p-2 w-full md:w-1/2'>
											<div className='font-bold mb-2 text-gray-800'>Location</div>
											<div className='font-bold text-gray-800 text-lg'>
												North America (50%), Europe (30%), Asia (20%)
											</div>
										</div>
										<div className='p-2 w-full md:w-1/2'>
											<div className='font-bold mb-2 text-gray-800'>Interests</div>
											<div className='font-bold text-gray-800 text-lg'>
												Fashion (30%), Beauty (20%), Tech (10%), Sports (40%)
											</div>
										</div>
									</div>
								</div>

								{/* BRAND EVANGELIST ACTIVITY */}

								<div className='font-bold mb-4 text-2xl'>Brand Evangelist Activity</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Number of Brand Evangelists</div>
										<div className='font-bold text-3xl text-primary'>3,456</div>
									</div>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Number of Shares/Referrals</div>
										<div className='font-bold text-3xl text-primary'>789</div>
									</div>
								</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Reach</div>
										<div className='font-bold text-3xl text-primary'>123,456</div>
									</div>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Top Performing Brand Evangelists</div>
										<div className='font-bold text-gray-800 text-lg'>
											Brand Evangelist A (50 shares), Brand Evangelist B (30 shares), Brand Evangelist C (20
											shares)
										</div>
									</div>
								</div>

								<div className='font-bold mb-4 text-2xl'>Performance Metrics</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Conversion Rate</div>
										<div className='font-bold text-3xl text-primary'>12%</div>
									</div>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Average Order Value</div>
										<div className='font-bold text-3xl text-primary'>$123</div>
									</div>
								</div>
								<div className='flex flex-col mb-4 md:flex-row'>
									<div className='p-2 w-full md:w-1/2'>
										<div className='font-bold mb-2 text-gray-800'>Lifetime Value of a Customer</div>
										<div className='font-bold text-3xl text-primary'>$1,234</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</HeaderLayout>
		</>
	);
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = '/account/login';
