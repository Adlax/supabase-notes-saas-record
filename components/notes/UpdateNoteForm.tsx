import { Note } from "./NotesList";

function UpdateNoteForm({ note }: { note: Note }) {
	return (
		<form>
			<input type="hidden" name="id" value={note.id} />
			<input type="text" name="title" defaultValue={note.title} className="" />
			<textarea name="content" id="content" defaultValue={note.content ?? ""} rows={10} className=""></textarea>
			<div>
				<input type="file" accept="image/*" name="cover" className="" />
				<div>
					<div>No image</div>
				</div>
			</div>
			<button type="submit" className="">
				Update
			</button>
		</form>
	);
}

export default UpdateNoteForm;
