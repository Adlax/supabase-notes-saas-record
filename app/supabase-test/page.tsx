"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default async function TestSupabasePage() {
	const supabase = createBrowserSupabaseClient();

	const { data, error } = await supabase.auth.getSession();

	return (
		<main>
			<h1 className="text-2xl font-bold">Supabase connection test</h1>
			<pre>{JSON.stringify({ data, error })}</pre>
		</main>
	);
}
