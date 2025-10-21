"use client";

import { useState } from "react";

interface RefreshButtonProps {
    path: string; // örn: "/books" veya "/blog"
    label?: string;
}

export default function Refresh({ path, label = "Cache'i Yenile" }: RefreshButtonProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleRevalidate = async () => {
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/revalidate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
                    path,
                }),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                const text = await res.text();
                throw new Error(`Server response is not JSON: ${text}`);
            }

            if (!res.ok) throw new Error(data.message || "Revalidation failed");

            setStatus(`✅ ${path} sayfası cache'ten temizlendi`);
        } catch (err: any) {
            setStatus(`❌ Hata: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-2">
            <button
                onClick={handleRevalidate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Yenileniyor..." : label}
            </button>
            {status && <p className="text-sm mt-1">{status}</p>}
        </div>
    );
}
