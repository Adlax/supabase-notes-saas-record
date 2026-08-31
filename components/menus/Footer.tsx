function Footer() {
	return (
		<div className="w-full h-40 bg-[var(--userbar-bg)] flex items-center text-[var(--primary-50)] text-center">
			<div className="mx-auto max-w-6xl flex-col items-center justify-center">
				<div className="text-[var(--primary-400)]">Note Mate</div>
				<div>Made by Adlax for educational purposes</div>
				<div className="text-[var(--primary-100)]">{new Date().getFullYear()}</div>
			</div>
		</div>
	);
}
export default Footer;
