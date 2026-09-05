"use client";
import Link from "next/link";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 p-8">
			<h1 className="mb-4 text-3xl font-bold">An error occurred</h1>
			<p className="text-gray-500">An unexpected error occurred</p>
			<button onClick={reset} className="rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
				Retry
			</button>
			<Link href="/dashboard" className="rounded border px-4 py-2 bg-[var(--primary-500)] hover:bg-[var(--primary-200)]">
				Dashboard
			</Link>
		</div>
	);
}

export default ErrorPage;
