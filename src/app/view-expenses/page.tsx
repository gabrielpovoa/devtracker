"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/Components/Heading/Heading";

export default function Page() {
    const [expenses, setExpenses] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [workers, setWorkers] = useState([]);

    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedWorker, setSelectedWorker] = useState("");

    // ---------------------------------------------------------
    // 🔥 Aqui será conectado ao PRISMA (endpoint /api/expenses)
    // ---------------------------------------------------------
    useEffect(() => {
        async function fetchData() {
            try {

                const res = await fetch("/api/expenses");
                const json = await res.json();

                setExpenses(json.expenses || []);
                setVehicles(json.vehicles || []);
                setWorkers(json.workers || []);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }

        fetchData();
    }, [selectedVehicle, selectedWorker]);

    return (
        <section className="mt-7 md:mt-0 p-5 md:p-10 text-white">

            <Heading
                Title="Verificar Despesas"
                Weight="font-medium"
                Color="text-white"
                TextTransform="capitalize"
                Fontsize="text-4xl"
            />

            <p className="mt-4 text-gray-300">Aqui você pode consultar suas despesas.</p>

            {/* FILTROS */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-xl backdrop-blur border border-white/10">

                {/* Filtro por veículo */}
                <div className="flex flex-col">
                    <label className="text-gray-300 mb-2">Placa do veículo</label>
                    <select
                        className="bg-white/10 border border-white/20 p-3 rounded-lg text-white"
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}>
                        <option value="">Todos</option>
                        {vehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.placa} - {v.modelo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro por colaborador */}
                <div className="flex flex-col">
                    <label className="text-gray-300 mb-2">Colaborador</label>
                    <select
                        className="bg-white/10 border border-white/20 p-3 rounded-lg text-white"
                        value={selectedWorker}
                        onChange={(e) => setSelectedWorker(e.target.value)}>
                        <option value="">Todos</option>
                        {workers.map((w) => (
                            <option key={w.id} value={w.id}>
                                {w.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* GRID DE DESPESAS */}
            <div className="mt-10 grid grid-cols-1 gap-4">
                {expenses.length === 0 && (
                    <p className="text-gray-400 text-center mt-10">Nenhuma despesa encontrada.</p>
                )}

                {expenses.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white/10 border border-white/10 p-5 rounded-xl
                                  flex flex-col md:flex-row md:items-center justify-between
                                  hover:bg-white/20 transition">
                        <div className="space-y-1">
                            <p className="text-lg font-medium">{item.colaborador?.nome}</p>

                            <p className="text-gray-300">
                                {item.vehicle?.placa} — {item.vehicle?.modelo}
                            </p>

                            <p className="text-gray-400 text-sm">
                                {new Date(item.dia).toLocaleDateString("pt-BR")}
                                {" • "}
                                {item.tipoGasto}
                            </p>
                        </div>

                        <button
                            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium"
                            onClick={() => alert(`Editar ${item.id}`)}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
