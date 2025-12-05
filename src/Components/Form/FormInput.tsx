"use client";

import { ReactNode } from "react";

type Props = {
    id: string;
    label: string;
    name:string;
    icon?: ReactNode;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    value?: any;
    onChange?: (e: any) => void;
};

export default function FormInput(data: Props) {
    const dataProp = data;
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={dataProp.id} className="font-medium flex items-center gap-2">
                {dataProp.icon} {dataProp.label}
            </label>

            <input
                id={dataProp.id}
                type={dataProp.type}
                name={dataProp.name}
                value={dataProp.value}
                readOnly={dataProp.readOnly}
                onChange={dataProp.onChange}
                placeholder={dataProp.placeholder}
                className={`w-full p-3 rounded-lg border shadow-sm outline-none 
                    ${dataProp.readOnly
                    ? "bg-[#1c1f2b] border-[#34394a] text-gray-400"
                    : "bg-[#262b3a] border-[#34394a] focus:ring-2 focus:ring-blue-500 text-gray-100"
                }`}
            />
        </div>
    );
}
