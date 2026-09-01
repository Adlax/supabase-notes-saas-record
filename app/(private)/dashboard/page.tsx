import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/app/auth/auth";
import Intro from "@/components/menus/Intro";
import { redirect } from "next/navigation";

async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-8">
			{/* Dashboard Intro */}
			<Intro />
			{/* Listener to build/inject session into websocket for realtime */}
			{/* Creation form */}
			{/* Notes Listing  */}
		</div>
	);
}

export default DashboardPage;
