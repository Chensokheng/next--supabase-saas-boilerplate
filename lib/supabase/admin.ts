"use server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export async function supabaseAdmin() {
	const supabase = createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_ADMIN!,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		}
	);
	return supabase;
}
