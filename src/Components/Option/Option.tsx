import { LucideIcon } from "lucide-react";
import Link from "next/link";

type OptionProps = {
    title: string;
    path: string;      // NOVO: rota vinda do routes.ts
    className?: string;
    Icon: LucideIcon;
    color: string;
};

const Option = ({ title, path, className, Icon, color }: OptionProps) => {
    return (
        <Link
            href={path}   // usa a rota correta
            className={`
                ${className}
                flex flex-col items-center justify-center
                gap-3 p-6 rounded-xl h-40 
                bg-[#1c1f2b] hover:bg-[#262b3a]
                transition-all shadow-md
            `}
        >
            <Icon size={30} className={`${color}`} />
            <span className="text-white text-lg font-semibold">
                {title}
            </span>
        </Link>
    );
};

export default Option;
