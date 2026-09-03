"use client";

import { updateNoteAction } from "@/actions/notes";
import { Note } from "./NotesList";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function UpdateNoteForm({ note }: { note: Note }) {
	const router = useRouter();
	const [updated, setUpdated] = useState(false);
	const [preview, setPreview] = useState(note.imageUrl ?? null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			setPreview(null);
			return;
		}
		const previewUrl = URL.createObjectURL(file);
		setPreview(previewUrl);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await updateNoteAction(formData);
		setUpdated(true);
		setTimeout(() => {
			router.push("/dashboard");
		}, 500);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input type="hidden" name="id" value={note.id} />
			<input type="text" name="title" defaultValue={note.title} className="w-full rounded p-3" />
			<textarea name="content" id="content" defaultValue={note.content ?? ""} rows={10} className="w-full rounded border p-3"></textarea>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 items-center">
				<input type="file" accept="image/*" name="cover" className="w-full rounded px-4 py-2" onChange={handleFileChange} />
				{preview && (
					<div className="relative w-20 h-20 overflow-hidden rounded">
						<Image src={preview} alt="Cover preview" fill className="object-cover" />
					</div>
				)}
			</div>
			<button type="submit" className="rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)]">
				{updated ? "Updated!" : "Update"}
			</button>
		</form>
	);
}

export default UpdateNoteForm;
