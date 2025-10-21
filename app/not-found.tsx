import Link from "next/link";

export const metadata = {
    title: "Sayfa Bulunamadı!",
    description: "",
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                Üzgünüz, aradığınız sayfa bulunamadı.
            </p>
            <Link
                href="/"
                className="text-blue-500 hover:underline"
            >
                Ana sayfaya dön
            </Link>
        </main>
    );
}

