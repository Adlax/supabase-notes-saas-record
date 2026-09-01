import NoteCard from "./NoteCard";

export type Note = {
	id: string;
	title: string;
	content?: string | null;
	imageUrl?: string | null;
};

function NotesList({ notes }: { notes: Note[] }) {
	return (
		<div className="mt-8">
			<h1 className="text-2xl font-bold">My previous notes</h1>
			{notes?.length === 0 && <p className="text-gray-500">No notes yet</p>}
			<div className="flex flex-col gap-y-6">
				{notes?.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</div>
	);
}

export default NotesList;
