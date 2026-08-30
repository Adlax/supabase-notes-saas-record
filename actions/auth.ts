"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	try {
		const email = formData.get("email") as string;

		const supabase = await createServerSupabaseClient();

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
			},
		});

		if (error) {
			throw error;
		}
	} catch (error) {
		console.error("Login failed", error);
		throw error;
	}
}

export async function logoutAction() {
	const supabase = await createServerSupabaseClient();

	try {
		await supabase.auth.signOut();
	} catch (error) {
		console.error("Logout failed", error);
		throw error;
	}

	redirect("/login");
}
