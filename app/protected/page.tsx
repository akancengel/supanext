import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";

export default async function ProtectedPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <pre className="text-xs font-mono p-3 rounded border overflow-auto">
                {JSON.stringify(data.claims, null, 2)}
            </pre>
        </div>
    );
}
