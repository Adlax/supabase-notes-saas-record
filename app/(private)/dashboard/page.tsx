import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/app/auth/auth";
import Intro from "@/components/menus/Intro";
import NotesList from "@/components/notes/NotesList";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	// fetch the notes
	const supabase = await createServerSupabaseClient();

	const { data: notes, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return (
		<div className="p-8">
			{/* Dashboard Intro */}
			<Intro />
			{/* Listener to build/inject session into websocket for realtime */}
			{/* Creation form */}
			{/* Notes Listing  */}
			<NotesList notes={notes} />
		</div>
	);
}

export default DashboardPage;
