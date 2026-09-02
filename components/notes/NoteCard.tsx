import Link from "next/link";
import { Note } from "./NotesList";
import { deleteNoteAction } from "@/actions/notes";
import { Trash2 } from "lucide-react";

function NoteCard({ note }: { note: Note }) {
	return (
		<div className="border rounded-xl p-3 hover:bg-[var(--primary-50)] h-30 shadow-[4px_0_15px_rgba(0,0,0,0.08)] overflow-hidden">
			<div className="grid grid-cols-[1fr_auto] items-center">
				{/* Link */}
				<Link href={`/notes/${note.id}`} className="grid grid-cols-[80px_1fr_auto] gap-4 font-medium items-center">
					<div className="h-20 w-20 rounded border flex items-center justify-center text-xs">No image</div>
					<div className="overflow-hidden">
						<h3 className="font-medium line-clamp-1">{note.title}</h3>
						<p className="text-sm text-gray-500 line-clamp-3">{note.content}</p>
					</div>
				</Link>
				{/* Delete */}
				<form action={deleteNoteAction} className="hover:bg-red-500 p-4 rounded-xl">
					<input type="hidden" name="noteId" value={note.id} />
					<button type="submit">
						<Trash2 />
					</button>
				</form>
			</div>
		</div>
	);
}

export default NoteCard;
