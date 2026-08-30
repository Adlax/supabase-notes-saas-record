import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/app/auth/auth";
import { redirect } from "next/navigation";

async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-8">
			Dashboard
			<form action={logoutAction} className="self-end">
				<button type="submit" className="rounded border px-3 py-1 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
					Logout
				</button>
			</form>
		</div>
	);
}

export default DashboardPage;
