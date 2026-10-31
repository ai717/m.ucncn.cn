-- 1. 创建 profiles 表，存储每个用户的会员状态与权限
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_annual_vip boolean default false,
  vip_expire_at timestamp with time zone,
  unlocked_projects text[] default array[]::text[],
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. 开启行级安全（Row Level Security），保障数据安全
alter table public.profiles enable row level security;

-- 3. 策略：允许用户读取自己的 profile 数据
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 4. 策略：允许用户更新自己的 profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 5. 触发器：新用户通过 Supabase Auth 注册时，自动在 profiles 表创建一行记录
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, is_annual_vip, unlocked_projects)
  values (new.id, new.email, false, array[]::text[]);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
