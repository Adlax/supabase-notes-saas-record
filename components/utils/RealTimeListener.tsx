"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RealTimeListener() {
	const router = useRouter();

	useEffect(() => {
		const supabase = createBrowserSupabaseClient();
		// Channel
		const channel = supabase
			.channel(`notes-changes`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "notes",
				},
				() => {
					router.refresh();
				},
			)
			.subscribe();
		//Cleaner
		return () => {
			supabase.removeChannel(channel);
		};
	}, [router]);

	return null;
}

export default RealTimeListener;
