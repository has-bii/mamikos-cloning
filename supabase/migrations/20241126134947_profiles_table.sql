create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text not null,
  email text not null,

  primary key (id)
);

alter table public.profiles enable row level security;

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  return new;
end;
$$;

create function public.handle_update_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
    update public.profiles
    set full_name = new.raw_user_meta_data ->> 'full_name',
    email = new.email
    where id = new.id;
    return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger on_auth_user_updated
    after update on auth.users
    for each row execute procedure public.handle_update_user();