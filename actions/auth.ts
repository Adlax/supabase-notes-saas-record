"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
	try {
		const email = formData.get("email") as string;

		const supabase = await createServerSupabaseClient();

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
			},
		});

		if (error) {
			throw error;
		}
	} catch (error) {
		console.log("Login failed", error);
		throw error;
	}
}
