import Link from "next/link";

function NotFound() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 p-8">
			<h1 className="text-3xl font-bold">404</h1>
			<p className="text-gray-500">Page not found</p>
			<Link href="/dashboard" className="rounded border px-4 py-2 bg-[var(--primary-500)] hover:bg-[var(--primary-200)]">
				Dashboard
			</Link>
		</div>
	);
}

export default NotFound;
