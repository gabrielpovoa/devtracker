import { useState, useEffect } from "react";
import { Car, Pencil } from "lucide-react";

const GetVehicle = () => {
    const [vehiclesList, setVehiclesList] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editPlate, setEditPlate] = useState("");
    const [editModel, setEditModel] = useState("");

    async function loadVehicles() {
        try {
            const res = await fetch("/api/vehicles");

            if (!res.ok) {
                console.error("Erro ao buscar veículos:", res.status);
                return;
            }

            const data = await res.json();
            setVehiclesList(data);
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    }

    async function handleUpdate(id: number) {
        try {
            const res = await fetch(`/api/vehicles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plate: editPlate,
                    model: editModel,
                }),
            });

            if (!res.ok) {
                console.error("Erro ao atualizar veículo");
                return;
            }

            // Atualiza lista após editar
            loadVehicles();
            setEditingId(null);
        } catch (err) {
            console.error("Erro ao atualizar:", err);
        }
    }

    function startEditing(v: any) {
        setEditingId(v.id);
        setEditPlate(v.plate);
        setEditModel(v.model);
    }

    useEffect(() => {
        loadVehicles();
    }, [vehiclesList]);

    return (
        <div className="mt-10 w-full">
            <h2 className="text-xl font-semibold mb-3">Veículos cadastrados</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehiclesList.length === 0 && (
                    <p className="text-gray-500">Nenhum veículo cadastrado ainda.</p>
                )}

                {vehiclesList.map((v) => (
                    <div
                        key={v.id}
                        className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 shadow-md"
                    >
                        {editingId !== v.id ? (
                            // ▶ Card normal
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Car size={28} className="text-indigo-400" />

                                    <div>
                                        <p className="text-white font-medium uppercase">{v.plate}</p>
                                        <p className="text-gray-400 text-sm uppercase">{v.model}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => startEditing(v)}
                                    className="p-2 rounded hover:bg-neutral-700 transition"
                                >
                                    <Pencil size={20} className="text-gray-300" />
                                </button>
                            </div>
                        ) : (
                            // ▶ Formulário de edição
                            <div className="flex flex-col gap-3">
                                <input
                                    value={editPlate}
                                    onChange={(e) => setEditPlate(e.target.value)}
                                    className="bg-neutral-700 text-white p-2 rounded outline-none"
                                />
                                <input
                                    value={editModel}
                                    onChange={(e) => setEditModel(e.target.value)}
                                    className="bg-neutral-700 text-white p-2 rounded outline-none"
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdate(v.id)}
                                        className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-white"
                                    >
                                        Salvar
                                    </button>

                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetVehicle;
