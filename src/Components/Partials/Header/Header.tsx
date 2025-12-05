"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, ShieldUser, Menu, X } from "lucide-react";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* HEADER MOBILE */}
            <header className="md:hidden fixed top-0 left-0 w-full bg-[#1D3557] border-b border-gray-800/50 flex items-center justify-between px-6 py-4 z-50">
                <Link className="text-white font-semibold text-lg" href="/">DevTracker</Link>

                <button onClick={() => setOpen(true)} className="text-gray-300">
                    <Menu size={28} />
                </button>
            </header>

            {/* Espaço para o header mobile */}
            <div className="md:hidden pt-16" />

            {/* BACKDROP */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-[#1D3557] border-r border-gray-800/50 shadow-lg
                    flex flex-col py-8
                    fixed top-0 h-full w-64 z-50 transform transition-transform duration-300

                    md:translate-x-0
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* Botão fechar (Mobile) */}
                <button
                    onClick={() => setOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-gray-300"
                >
                    <X size={26} />
                </button>

                {/* TÍTULO DO SIDEBAR (oculto no mobile) */}
                <div className="hidden md:flex justify-center mb-10">
                    <Link href="/" className="text-gray-200 text-xl font-bold">DevTracker</Link>
                </div>

                {/* MENU SUPERIOR */}
                {/*<nav className="mt-10 w-full px-4 flex flex-col gap-4">*/}
                {/*    <Link*/}
                {/*        href="/dashboard"*/}
                {/*        className="text-gray-300 px-3 py-2 hover:bg-gray-800/40 rounded-md transition">*/}
                {/*        Dashboard*/}
                {/*    </Link>*/}
                {/*</nav>*/}

                {/* MENU INFERIOR */}
                <nav className="mt-auto w-full px-4 flex flex-col gap-4 pb-6">

                    <Link
                        href="/profile"
                        className="
                            flex items-center gap-3 text-gray-300 text-sm
                            hover:text-white hover:bg-gray-800/40
                            px-3 py-2 rounded-md transition
                        "
                    >
                        <ShieldUser size={18} />
                        <span>João Gabriel (ADMIN)</span>
                    </Link>

                    <Link
                        href="/logout"
                        className="
                            flex items-center gap-3 text-gray-300 text-sm
                            hover:text-white hover:bg-gray-800/40
                            px-3 py-2 rounded-md transition
                        "
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </Link>

                </nav>

            </aside>
        </>
    );
};

export default Sidebar;
