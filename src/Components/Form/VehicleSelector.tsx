"use client";

import { useEffect, useState } from "react";
import { Car } from "lucide-react";

type Vehicle = {
    id: number;
    plate: string;
    model: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function VehicleSelector({ value, onChange }: Props) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadVehicles() {
        try {
            const res = await fetch("/api/vehicles");
            if (!res.ok) return console.error("Erro ao carregar veículos");

            const data = await res.json();
            setVehicles(data);
        } catch (err) {
            console.error("Erro de conexão:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVehicles();
    }, []);

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Selecione um veículo</label>

            <div className="relative w-full">
                {/* ÍCONE */}


                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 p-3 rounded-lg bg-neutral-800 border border-neutral-700
                               text-white outline-none uppercase"
                >
                    <option value="">-- ESCOLHA UM VEÍCULO --</option>

                    {loading && <option value="">CARREGANDO...</option>}

                    {!loading && vehicles.length === 0 && (
                        <option value="">NENHUM VEÍCULO CADASTRADO</option>
                    )}

                    {!loading &&
                        vehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.plate} — {v.model}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}
