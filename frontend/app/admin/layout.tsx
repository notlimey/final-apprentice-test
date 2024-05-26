import { getCurrentUser } from '@/common/lib/session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const user = await getCurrentUser();

	if (user?.roles.indexOf('Admin') === -1) {
		return <div>Access Denied</div>;
	}

	return children;
}
