import Link from "next/link";

function Navbar() {
	return (
		<div className="border-b bg-[var(--navbar-bg)] shadow-2xl">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				<div className="flex items-center h-full">
					<Link href={"/dashboard"} className="font-bold h-full hover:bg-[var(--primary-500)] transition flex items-center px-2">
						Dashboard
					</Link>
					<Link href={"/about"} className="font-bold h-full hover:bg-[var(--primary-500)] transition flex items-center px-2">
						About
					</Link>
				</div>
			</div>
		</div>
	);
}
export default Navbar;
