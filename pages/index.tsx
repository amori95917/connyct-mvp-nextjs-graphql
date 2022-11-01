import { useAuth } from '@/contexts/auth';

export default function Home() {
	const { user } = useAuth();
	console.log('user', user);
	return <div>Home</div>;
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = '/account/login';
