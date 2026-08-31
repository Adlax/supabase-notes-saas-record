import { logoutAction } from "@/actions/auth";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Userbar({ user }: { user?: string | null }) {
	return (
		<div>
			<div>
				<div>
					<Link href={"/dashboard"}>
						<Image src={"/logo-2.png"} alt="logo" fill className="object-cover" />
					</Link>
				</div>
				<div>
					<div>
						<CircleUserRound />
						<span>{user}</span>
					</div>
					<form action={logoutAction} className="self-end">
						<button
							type="submit"
							className="rounded border px-3 py-1 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]"
						>
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Userbar;
