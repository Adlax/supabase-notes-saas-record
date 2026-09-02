import { getCurrentUser } from "@/app/auth/auth";
import UpdateNoteForm from "@/components/notes/UpdateNoteForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function NotePage({ params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const { id } = await params;

	const supabase = await createServerSupabaseClient();

	const { data: note } = await supabase.from("notes").select("*").eq("id", id).single();

	return (
		<div className="mx-auto max-w-3xl px-1 py-8 sm:px-8">
			<h1 className="mb-8 text-2xl font-bold">Update the note</h1>
			<div>No image</div>
			<UpdateNoteForm note={note} />
		</div>
	);
}

export default NotePage;
