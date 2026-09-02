create policy "Users can read their own cover image"
on storage.objects
for select 
to authenticated
using (
    bucket_id = 'note-covers'
    and owner_id = (select auth.uid()::text)
);

create policy "Users can create their own cover image"
on storage.objects
for insert 
to authenticated
with check (
    bucket_id = 'note-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users can update their own cover image"
on storage.objects
for update 
to authenticated
using (
    bucket_id = 'note-covers'
    and owner_id = (select auth.uid()::text)
)
with check (
    bucket_id = 'note-covers'
    and owner_id = (select auth.uid()::text)
);

create policy "Users can delete their own cover image"
on storage.objects
for delete 
to authenticated
using (
    bucket_id = 'note-covers'
    and owner_id = (select auth.uid()::text)
);
