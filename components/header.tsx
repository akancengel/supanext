import React from 'react'
import Link from 'next/link'

import { AuthButton } from './auth-button'

import { createClient } from "@/lib/supabase/server";

export async function Header() {

    // GET USER
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>HOME</Link>
                    <Link href={"/protected"}>PROTECTED</Link>
                    <Link href={"/books"}>BOOKS</Link>
                    {user ? <Link href={"/dashboard"}>DASHBOARD</Link> : null}
                    {user ? <Link href={"/dashboard/books"}>MY BOOKS</Link> : null}
                </div>
                <AuthButton />
            </div>
        </nav>
    )
}

export default Header