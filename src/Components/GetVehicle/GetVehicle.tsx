import {useState, useEffect} from "react";
import {Car} from "lucide-react";

const GetVehicle = () => {
    const [vehiclesList, setVehiclesList] = useState<any[]>([]);

    async function loadVehicles() {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        setVehiclesList(data);
    }

    useEffect(() => {
        loadVehicles();
    },[vehiclesList]);

    return<>
        {/* LISTA DE VEÍCULOS */}
        <div className="mt-10 w-full">
            <h2 className="text-xl font-semibold mb-3">Veículos cadastrados</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehiclesList.length === 0 && (
                    <p className="text-gray-500">Nenhum veículo cadastrado ainda.</p>
                )}

                {vehiclesList.map((v) => (
                    <div
                        key={v.id}
                        className="flex items-center gap-3 bg-neutral-800 p-4 rounded-xl border border-neutral-700 shadow-md"
                    >
                        <Car size={28} className="text-indigo-400" />

                        <div>
                            <p className="text-white font-medium uppercase">{v.plate}</p>
                            <p className="text-gray-400 text-sm uppercase">{v.model}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default GetVehicle;