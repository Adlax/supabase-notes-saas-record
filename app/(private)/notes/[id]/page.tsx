import { getCurrentUser } from "@/app/auth/auth";
import UpdateNoteForm from "@/components/notes/UpdateNoteForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function NotePage({ params }: { params: Promise<{ id: string }> }) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const { id } = await params;

	const supabase = await createServerSupabaseClient();

	//Fetch note
	const { data: note } = await supabase.from("notes").select("*").eq("id", id).single();

	//Fetch its image
	let imageUrl: string | null = null;

	if (note.cover_image_path) {
		const { data } = await supabase.storage.from("note-covers").createSignedUrl(note.cover_image_path, 3600);
		imageUrl = data?.signedUrl ?? null;
	}

	const noteWithUrl = {
		...note,
		imageUrl,
	};

	return (
		<div className="mx-auto max-w-3xl px-1 py-8 sm:px-8">
			<h1 className="mb-8 text-2xl font-bold">Update the note</h1>
			{imageUrl && (
				<div className="relative w-full aspect-[4/3] overflow-hidden rounded">
					<Image src={imageUrl} alt="Cover image" fill className="object-cover" />
				</div>
			)}
			<UpdateNoteForm note={noteWithUrl} />
		</div>
	);
}

export default NotePage;
