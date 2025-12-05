import { ReactNode } from "react";

type Props = {
    id: string;
    label: string;
    icon?: ReactNode;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function FormSelect(props: Props) {

    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor={props.id}
                className="font-medium flex items-center gap-2"
            >
                {props.icon} {props.label}
            </label>

            <select
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a]
                           focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            >
                {props.options.map((op) => (
                    <option
                        key={op.value}
                        value={op.value}
                        className="bg-[#1c1f2b]"
                    >
                        {op.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
