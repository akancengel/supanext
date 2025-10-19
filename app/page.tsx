import { Hero } from "@/components/hero";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">

                <Header />
                <Hero />
                <Footer />
                
            </div>
        </main>
    );
}
