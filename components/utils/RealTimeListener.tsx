"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RealTimeListener() {
	const router = useRouter();

	useEffect(() => {
		const supabase = createBrowserSupabaseClient();
		//Channel type
		let channel: ReturnType<typeof supabase.channel> | null = null;
		//To avoid 2 times useeffect because of strict mode use this boolean:
		let isMounted = true;
		//Setup definition
		async function setup() {
			const { data } = await supabase.auth.getSession();
			if (!data.session || !isMounted) {
				return;
			}
			await supabase.realtime.setAuth(data.session.access_token);
			// Channel
			channel = supabase
				.channel(`notes-changes`)
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: "notes",
					},
					(payload) => {
						console.log("Events: ", payload);
						router.refresh();
					},
				)
				.subscribe((status) => console.log("Realtime Status:", status));
		}
		// Launch setup
		setup();
		//Cleaner
		return () => {
			isMounted = false;
			if (channel) {
				supabase.removeChannel(channel);
			}
		};
	}, [router]);

	return null;
}

export default RealTimeListener;
