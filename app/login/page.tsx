function LoginPage() {
	return (
		<div className="mx-auto mt-20 max-w-md">
			<h1 className="mb-6 text-2xl font-bold">Login</h1>
			<form action="" className="space-y-6">
				<input type="email" name="email" id="email" placeholder="Your email here..." required className="w-full rounded border p-3" />
				<button type="submit" className="rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
					Send authentication mail
				</button>
			</form>
		</div>
	);
}

export default LoginPage;
