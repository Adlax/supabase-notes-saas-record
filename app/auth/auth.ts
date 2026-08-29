import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
	try {
		const supabase = await createServerSupabaseClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log(user);
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
}
