## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [Supabase](https://supabase.com/) - Build in a weekend Scale to millions.
-   [Shadcn](https://ui.shadcn.com/) - Build your component library.
-   [React Query](https://tanstack.com/query/latest/) - TanStack Query.

## Profile table

```sql
create table
  public.profiles (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    email text not null,
    display_name text null,
    image_url text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```

## Auth Trigger Function

```sql
begin

  insert into public.profiles(id,email,display_name,image_url)
  values(
    new.id,
    new.raw_user_meta_data ->> 'email',
    COALESCE(new.raw_user_meta_data ->> 'user_name',new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;

end;
```

### Auth Trigger Creation

```sql
create trigger create_user_on_signup
after insert on auth.users for each row
execute function create_user_on_signup ();
```

### Remove Trigger

```sql
drop trigger create_user_on_signup on auth.users;
```
