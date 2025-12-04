"use client";

import { useState } from "react";
import {
    User, Route, Gauge, Calendar, FileText, Coins
} from "lucide-react";

type Vehicle = {
    plate: string;
    model: string;
};

type ExpenseFormProps = {
    vehicles?: Vehicle[]; // agora é opcional
};

export default function ExpenseForm({ vehicles = [] }: ExpenseFormProps) {
    const [selectedVehicle, setSelectedVehicle] = useState("");

    // Mock para testes
    const mockVehicles: Vehicle[] = [
        { plate: "ABC-1234", model: "Fiat Uno" }
    ];

    // Se vehicles vier vazio, usa o mock
    const list = vehicles.length > 0 ? vehicles : mockVehicles;

    return (
        <div className="mt-8 bg-[#1c1f2b] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.45)] border border-[#262b3a] text-gray-200 max-w-5xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
                <Coins className="w-6 h-6 text-blue-400" />
                Registrar Despesa
            </h2>

            <form className="space-y-8">

                {/* ROW: Colaborador + Veículo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Colaborador */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="colaborador" className="font-medium flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Nome do Colaborador
                        </label>
                        <input
                            id="colaborador"
                            type="text"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] focus:ring-2 focus:ring-blue-500 shadow-sm outline-none text-gray-100"
                            placeholder="Digite o nome"
                        />
                    </div>

                    {/* Select Veículo */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="vehicle" className="font-medium flex items-center gap-2">
                            <Route className="w-5 h-5 text-blue-400" />
                            Veículo (Placa / Modelo)
                        </label>

                        <select
                            id="vehicle"
                            value={selectedVehicle}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option className="bg-[#1c1f2b]">Selecione um veículo…</option>

                            {list.map((v) => (
                                <option key={v.plate} value={v.plate}  className="bg-[#1c1f2b]">
                                    {v.plate} — {v.model}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* KM ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* KM INICIAL */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="kmInicial" className="font-medium flex items-center gap-2">
                            <Route className="w-5 h-5 text-blue-400" />
                            KM Inicial
                        </label>

                        <input
                            id="kmInicial"
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0"
                        />
                    </div>

                    {/* KM FINAL */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="kmFinal" className="font-medium flex items-center gap-2">
                            <Route className="w-5 h-5 text-blue-400" />
                            KM Final
                        </label>

                        <input
                            id="kmFinal"
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0"
                        />
                    </div>

                    {/* KM RODADOS */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="kmRodados" className="font-medium flex items-center gap-2">
                            <Gauge className="w-5 h-5 text-blue-400" />
                            KM Rodados
                        </label>

                        <input
                            id="kmRodados"
                            type="number"
                            readOnly
                            className="w-full p-3 rounded-lg bg-[#1c1f2b] border border-[#34394a] text-gray-400 shadow-sm"
                            placeholder="Auto"
                        />
                    </div>
                </div>

                {/* HOUR ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* HORA INICIAL */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="horaInicial" className="font-medium">Hora Inicial</label>

                        <input
                            id="horaInicial"
                            type="time"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* HORA FINAL */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="horaFinal" className="font-medium">Hora Final</label>

                        <input
                            id="horaFinal"
                            type="time"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* HORAS EM MOVIMENTO */}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="horasMovimento" className="font-medium">Horas em Movimento</label>

                        <input
                            id="horasMovimento"
                            type="text"
                            readOnly
                            className="w-full p-3 rounded-lg bg-[#1c1f2b] border border-[#34394a] text-gray-400 shadow-sm"
                            placeholder="Auto"
                        />
                    </div>
                </div>

                {/* DIA + TIPO DE GASTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* DIA */}
                    <div className="flex flex-col gap-3">
                        <label
                            htmlFor="dia"
                            className="font-medium flex items-center gap-2"
                        >
                            <Calendar className="w-5 h-5 text-blue-400" />
                            Dia
                        </label>

                        <input
                            id="dia"
                            type="date"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* TIPO DE GASTO */}
                    <div className="flex flex-col gap-3">
                        <label
                            htmlFor="tipoGasto"
                            className="font-medium flex items-center gap-2"
                        >
                            <Coins className="w-5 h-5 text-blue-400" />
                            Tipo de Gasto
                        </label>

                        <select
                            id="tipoGasto"
                            className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option className="bg-[#1c1f2b]">Selecione...</option>
                            <option className="bg-[#1c1f2b]" value="pedagio">Pedágio</option>
                            <option className="bg-[#1c1f2b]" value="abastecimento">Abastecimento</option>
                            <option className="bg-[#1c1f2b]" value="alimentacao">Alimentação</option>
                            <option className="bg-[#1c1f2b]" value="outro">Outro</option>
                        </select>
                    </div>
                </div>

                {/* OBSERVAÇÃO */}
                <div className="flex flex-col gap-3">
                    <label
                        htmlFor="observacao"
                        className="font-medium flex items-center gap-2"
                    >
                        <FileText className="w-5 h-5 text-blue-400" />
                        Observação
                    </label>

                    <textarea
                        id="observacao"
                        rows={3}
                        className="w-full p-3 rounded-lg bg-[#262b3a] border border-[#34394a] shadow-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                        placeholder="Escreva observações adicionais..."
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-medium text-white shadow-lg transition"
                >
                    Salvar Despesa
                </button>

            </form>
        </div>
    );
}
