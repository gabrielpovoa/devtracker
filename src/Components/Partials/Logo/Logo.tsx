// src/Components/Partials/Logo/Logo.tsx
'use client'
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

type Props = {
    src: string | StaticImageData;
    // Adicionamos uma prop para controlar se o texto deve ser ocultado (usado na sidebar colapsada)
    hideText?: boolean;
};


export const Logo = ({ src, hideText }: Props) => {
    return (
        <Link href="/" className="flex items-end gap-2 px-4 group">
            <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-[1.5px] rounded-xl group-hover:shadow-md group-hover:shadow-indigo-500/20 transition">
                <div className="bg-[#0C120C] rounded-xl p-0.5">
                    <Image
                        src={src}
                        alt="SobekTrack Logo"
                        // Reduzimos o tamanho da imagem de 70x70 para 40x40
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Ocultamos o texto se hideText for true */}
            {!hideText && (
                <div className="flex flex-col">
                    {/* Ajustamos o tamanho do texto para ser mais discreto */}
                    <h1 className="text-gray-100 text-xs font-bold tracking-wide leading-tight">
                        SobekTrack
                    </h1>
                    <span className="text-indigo-400/80 text-[10px]">
                        Expense Manager
                    </span>
                </div>
            )}
        </Link>
    )
}
