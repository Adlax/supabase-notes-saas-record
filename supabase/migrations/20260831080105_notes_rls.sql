alter table public.notes enable row level security;

create policy "Users can read their own notes"
on public.notes 
for select 
to authenticated 
using( (select auth.uid()) = user_id );

create policy "Users can insert their own notes"
on public.notes 
for insert
to authenticated 
with check ( (select auth.uid()) = user_id );

create policy "Users can update their own notes"
on public.notes 
for update
to authenticated 
using( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

create policy "Users can delete their own notes"
on public.notes 
for delete
to authenticated 
using( (select auth.uid()) = user_id );
