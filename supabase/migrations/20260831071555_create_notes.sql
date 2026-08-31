create table public.notes (
    id                  uuid    primary key    default gen_random_uuid(),
    user_id             uuid    not null    references auth.users(id)   on delete cascade,
    title               text    not null,
    content             text,
    created_at          timestamptz     not null    default now(),
    updated_at          timestamptz     not null    default now(),
    cover_image_path    text
);