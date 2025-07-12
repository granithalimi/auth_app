"use server";
import { cookies } from "next/headers";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signin(formData: FormData) {
  const email = formData.get("email") as string;
  const pass = formData.get("pass") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  if(error){
    console.log(error)
    redirect("/login")
  }
  if (data) console.log(data);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  cookieStore.set('session', data.session.access_token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  redirect("/");
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const pass = formData.get("pass") as string;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) console.log(error);
  if (data) console.log(data);

  redirect("/login");
}

export async function signout() {
 await supabase.auth.signOut()
 redirect("/login")
}
