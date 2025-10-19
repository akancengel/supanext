import { createClient } from "@/lib/supabase/server";

export async function getUserBooks(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching user books:", error.message);
        return [];
    }

    return data || [];
}
