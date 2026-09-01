"use server";

import { getCurrentUser } from "@/app/auth/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

		//File handling

		//Note in db handling
		const { error: dbError } = await supabase.from("notes").update({ title, content }).eq("id", id).eq("user_id", user.id);

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
