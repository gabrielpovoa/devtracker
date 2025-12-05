import { ReactNode } from "react";

type Props = {
    id: string;
    label: string;
    icon?: ReactNode;
    rows?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
};

export default function FormTextarea(props: Props) {
    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor={props.id}
                className="font-medium flex items-center gap-2"
            >
                {props.icon} {props.label}
            </label>

            <textarea
                id={props.id}
                rows={props.rows}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a]
                           shadow-sm focus:ring-2 focus:ring-blue-500 outline-none
                           placeholder-gray-400"
            />
        </div>
    );
}
