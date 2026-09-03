"use server";

import { getCurrentUser } from "@/app/auth/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type UploadNoteData = {
	title: string;
	content: string;
	cover_image_path?: string;
};

export async function createNoteAction(formData: FormData) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			throw new Error("User not logged in");
		}

		const title = formData.get("title") as string;

		const supabase = await createServerSupabaseClient();

		const { error } = await supabase.from("notes").insert({
			title,
			content: "",
			user_id: user.id,
		});

		if (error) {
			throw error;
		}

		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Creation of note failed", error);
		console.log(error);
	}
}

export async function updateNoteAction(formData: FormData) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			throw new Error("User not logged in");
		}

		const supabase = await createServerSupabaseClient();

		const id = formData.get("id") as string;
		const title = formData.get("title") as string;
		const content = formData.get("content") as string;
		const file = formData.get("cover") as File | null;

		const updateNote: UploadNoteData = { title, content };

		//File handling
		if (file && file.size > 0) {
			//Log is sent
			console.log({ name: file.name, size: file.size, type: file.type });
			//Check if already image and remove existing
			const { data: existingNote, error: existingError } = await supabase
				.from("notes")
				.select("cover_image_path")
				.eq("id", id)
				.eq("user_id", user.id)
				.single();
			if (existingError) {
				throw existingError;
			}
			if (existingNote.cover_image_path) {
				const { error: removalError } = await supabase.storage.from("note-covers").remove([existingNote.cover_image_path]);
				if (removalError) {
					console.log(removalError);
				}
			}
			//Check type
			if (!file.type.startsWith("image/")) {
				throw new Error("Wrong type");
			}
			//Check size
			if (file.size > 5 * 1024 * 1024) {
				throw new Error("File too big");
			}
			//If all good : upload new image
			const filePath = `${user.id}/${id}/${Date.now()}-${file.name}`;
			const { error: uploadError } = await supabase.storage.from("note-covers").upload(filePath, file, { upsert: true });
			if (uploadError) {
				throw uploadError;
			}
			updateNote.cover_image_path = filePath;
		}

		//Note in db handling
		const { error: dbError } = await supabase.from("notes").update(updateNote).eq("id", id).eq("user_id", user.id);

		if (dbError) {
			throw dbError;
		}

		revalidatePath(`/notes/${id}`);

		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Update of note failed", error);
		console.log(error);
	}
}

export async function deleteNoteAction(formData: FormData) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			throw new Error("User not logged in");
		}

		const supabase = await createServerSupabaseClient();

		const noteId = formData.get("noteId") as string;

		//File handling

		//Note in db handling
		const { error: dbError } = await supabase.from("notes").delete().eq("id", noteId).eq("user_id", user.id);

		if (dbError) {
			throw dbError;
		}

		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Deletion of note failed", error);
		console.log(error);
	}
}
