"use client";

import {useState} from "react";
import {Heading} from "@/Components/Heading/Heading";
import {Car, Tag, BadgeCent, Calendar} from "lucide-react";
import Notification from "@/Components/Notification/Notification";
import GetVehicle from "@/Components/GetVehicle/GetVehicle";

export default function Page() {
    const [plate, setPlate] = useState("");
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");

    // estado da notificação
    const [notification, setNotification] = useState<string | null>(null);
    const [notifType, setNotifType] = useState<"success" | "error">("success");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/vehicles", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({plate, model, brand, year: Number(year)}),
        });

        if (res.ok) {
            setNotification("Veículo cadastrado com sucesso!");
            setNotifType("success");

            // limpa campos
            setPlate("");
            setModel("");
            setBrand("");
            setYear("");

        } else {
            setNotification("Erro ao cadastrar veículo.");
            setNotifType("error");
        }

        // remove notificação após 5 segundos
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }


    return (
        <section className="p-10 text-white">
            <Heading
                Title="Registrar Veículo"
                TextTransform="capitalize"
                Weight="font-medium"
                Fontsize="text-4xl"
            />

            <p className="mt-4 text-gray-300">Cadastre novos veículos aqui.</p>
            <div className="mt-10 flex flex-col md:flex-row gap-10 items-start">

                {/* Formulário */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-10 bg-neutral-900 p-6 rounded-xl w-full lg:w-xl xl space-y-6 shadow-lg border border-neutral-700 ">

                    {/* PLACA */}
                    <div>
                        <label className="text-gray-300 text-sm">Placa</label>
                        <div className="flex items-center gap-3 bg-neutral-800 px-4 py-3 rounded-lg mt-1">
                            <Tag size={20} className="text-indigo-400"/>
                            <input
                                value={plate}
                                onChange={(e) => setPlate(e.target.value)}
                                placeholder="ABC-1234"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500 uppercase"
                                required
                            />
                        </div>
                    </div>

                    {/* MODELO */}
                    <div>
                        <label className="text-gray-300 text-sm">Modelo</label>
                        <div className="flex items-center gap-3 bg-neutral-800 px-4 py-3 rounded-lg mt-1">
                            <Car size={20} className="text-green-400"/>
                            <input
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Fiat Uno"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500 uppercase"
                                required
                            />
                        </div>
                    </div>

                    {/* MARCA */}
                    <div>
                        <label className="text-gray-300 text-sm">Marca (opcional)</label>
                        <div className="flex items-center gap-3 bg-neutral-800 px-4 py-3 rounded-lg mt-1">
                            <BadgeCent size={20} className="text-fuchsia-400"/>
                            <input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Fiat, Ford, VW..."
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500 uppercase"
                            />
                        </div>
                    </div>

                    {/* ANO */}
                    <div>
                        <label className="text-gray-300 text-sm">Ano</label>
                        <div className="flex items-center gap-3 bg-neutral-800 px-4 py-3 rounded-lg mt-1">
                            <Calendar size={20} className="text-blue-400"/>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="2020"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* BOTÃO */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-medium">
                        Registrar Veículo
                    </button>
                </form>

                {/* Notificação */}
                {notification && (
                    <Notification message={notification} type={notifType}/>
                )}

                <GetVehicle/>
            </div>
        </section>
    );
}
