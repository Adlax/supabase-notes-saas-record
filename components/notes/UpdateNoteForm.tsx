import { Note } from "./NotesList";

function UpdateNoteForm({ note }: { note: Note }) {
	return (
		<form className="space-y-4">
			<input type="hidden" name="id" value={note.id} />
			<input type="text" name="title" defaultValue={note.title} className="w-full rounded p-3" />
			<textarea name="content" id="content" defaultValue={note.content ?? ""} rows={10} className="w-full rounded border p-3"></textarea>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 items-center">
				<input type="file" accept="image/*" name="cover" className="w-full rounded px-4 py-2" />
				<div>
					<div>No image</div>
				</div>
			</div>
			<button type="submit" className="rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
				Update
			</button>
		</form>
	);
}

export default UpdateNoteForm;
