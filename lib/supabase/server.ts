import { createServerClient } from "@supabase/ssr";

export function createServerSupabaseClient() {
	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
		cookies: {
			getAll() {
				return [];
			},
			setAll() {},
		},
	});
}
