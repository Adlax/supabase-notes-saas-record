import { getCurrentUser } from "@/app/auth/auth";
import { redirect } from "next/navigation";

async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return <div className="p-8">Dashboard</div>;
}

export default DashboardPage;
