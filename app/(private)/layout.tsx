import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth/auth";
import Userbar from "@/components/menus/Userbar";
import Navbar from "@/components/menus/Navbar";
import Footer from "@/components/menus/Footer";

async function PrivateLayout({ children }: { children: React.ReactNode }) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Userbar user={user.email} />
			<Navbar />
			<main className="mx-auto max-w-6xl flex-1">{children}</main>
			<Footer />
		</div>
	);
}

export default PrivateLayout;
