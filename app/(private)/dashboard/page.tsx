import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/app/auth/auth";
import Intro from "@/components/menus/Intro";
import CreateNoteForm from "@/components/notes/CreateNoteForm";
import NotesList from "@/components/notes/NotesList";
import RealTimeListener from "@/components/utils/RealTimeListener";
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

	//fetch images
	const notesWithImages = await Promise.all(
		(notes ?? []).map(async (note) => {
			let imageUrl = null;
			if (note.cover_image_path) {
				const { data } = await supabase.storage.from("note-covers").createSignedUrl(note.cover_image_path, 3600);
				imageUrl = data?.signedUrl ?? null;
			}
			return {
				...note,
				imageUrl,
			};
		}),
	);

	return (
		<div className="p-8">
			{/* Dashboard Intro */}
			<Intro />
			{/* Listener to build/inject session into websocket for realtime */}
			<RealTimeListener />
			{/* Creation form */}
			<CreateNoteForm />
			{/* Notes Listing  */}
			<NotesList notes={notesWithImages} />
		</div>
	);
}

export default DashboardPage;
