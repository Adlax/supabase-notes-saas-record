import { createNoteAction } from "@/actions/notes";

function CreateNoteForm() {
	return (
		<form action={createNoteAction}>
			<h1 className="text-2xl font-bold">Create a new note</h1>
			<input type="text" name="title" required placeholder="Title here" className="w-full rounded border p-3" />
			<button type="submit" className="mt-2 rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
				Create note
			</button>
		</form>
	);
}

export default CreateNoteForm;
