"use client";

import {useState, useEffect} from "react";
import {
    User,
    Route,
    Gauge,
    Calendar,
    FileText,
    Coins
} from "lucide-react";

import FormSection from "@/Components/Form/FormSection";
import FormSelect from "@/Components/Form/FormSelect";
import FormInput from "@/Components/Form/FormInput";
import FormTextarea from "@/Components/Form/FormTextArea";

type Vehicle = {
    id: number;
    plate: string;
    model: string;
};

export default function ExpenseForm() {
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [tipoGasto, setTipoGasto] = useState("");


    // ---- STATES PARA CÁLCULOS ----
    const [kmInicial, setKmInicial] = useState<number | "">("");
    const [kmFinal, setKmFinal] = useState<number | "">("");
    const [kmRodados, setKmRodados] = useState("");

    const [horaInicial, setHoraInicial] = useState("");
    const [horaFinal, setHoraFinal] = useState("");
    const [horasMovimento, setHorasMovimento] = useState("");

    // 🔵 Carrega veículos cadastrados
    useEffect(() => {
        async function loadVehicles() {
            try {
                const res = await fetch("/api/vehicles");
                if (!res.ok) return;

                const data = await res.json();
                setVehicles(data);
            } catch {
                console.log("Erro ao buscar veículos");
            } finally {
                setLoadingVehicles(false);
            }
        }

        loadVehicles();
    }, []);

    // 🔵 CALCULAR KM RODADOS
    useEffect(() => {
        if (kmInicial !== "" && kmFinal !== "") {
            const result = Number(kmFinal) - Number(kmInicial);

            if (result >= 0) {
                setKmRodados(`${result} km rodados`);
            } else {
                setKmRodados("Valor inválido");
            }
        } else {
            setKmRodados("");
        }
    }, [kmInicial, kmFinal]);

    // 🔵 CALCULAR HORAS EM MOVIMENTO
    useEffect(() => {
        if (horaInicial && horaFinal) {
            const [h1, m1] = horaInicial.split(":").map(Number);
            const [h2, m2] = horaFinal.split(":").map(Number);

            const start = h1 * 60 + m1;
            const end = h2 * 60 + m2;

            if (end >= start) {
                const diff = end - start;
                const horas = Math.floor(diff / 60);
                const minutos = diff % 60;

                setHorasMovimento(`${horas}h ${minutos}min`);
            } else {
                setHorasMovimento("Horário inválido");
            }
        } else {
            setHorasMovimento("");
        }
    }, [horaInicial, horaFinal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        );

        const payload = {
            colaborador: form.colaborador,
            vehicleId: selectedVehicle,
            tipoGasto,
            kmInicial,
            kmFinal,
            kmRodados: kmRodados.replace(" km rodados", ""),
            horaInicial,
            horaFinal,
            horasMovimento,
            dia: form.dia,
            observacao: form.observacao,
        };

        const res = await fetch("/api/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("Despesa salva com sucesso!");
        } else {
            alert("Erro ao salvar a despesa.");
        }
    };


    return (
        <div className="mt-8 bg-[#1c1f2b] rounded-2xl p-8 border border-[#262b3a] text-gray-200">

            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
                <Coins className="w-6 h-6 text-blue-400"/>
                Registrar Despesa
            </h2>

            <form className="space-y-10" onSubmit={handleSubmit}>

                {/* --- COLABORADOR + VEÍCULO --- */}
                <FormSection columns={2}>
                    <FormInput
                        id="colaborador"
                        label="Nome do Colaborador"
                        name="colaborador"
                        icon={<User className="w-5 h-5 text-blue-400"/>}
                        placeholder="Digite o nome"
                    />

                    <FormSelect
                        id="vehicle"
                        label="Veículo (Placa/Modelo)"
                        icon={<Route className="w-5 h-5 text-blue-400"/>}
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        options={[
                            {value: "", label: loadingVehicles ? "Carregando..." : "Selecione um veículo…"},
                            ...vehicles.map((v) => ({
                                value: v.id.toString(),
                                label: `${v.plate} — ${v.model}`
                            }))
                        ]}
                    />
                </FormSection>

                {/* --- KM ROW --- */}
                <FormSection columns={3}>
                    <FormInput
                        id="kmInicial"
                        label="KM Inicial"
                        name="kmInicial"
                        type="number"
                        value={kmInicial}
                        onChange={(e) => setKmInicial(e.target.value ? Number(e.target.value) : "")}
                        icon={<Route className="text-blue-300"/>}
                    />

                    <FormInput
                        id="kmFinal"
                        label="KM Final"
                        name="kmFinal"
                        type="number"
                        value={kmFinal}
                        onChange={(e) => setKmFinal(e.target.value ? Number(e.target.value) : "")}
                        icon={<Route className="text-blue-300"/>}
                    />

                    <FormInput
                        id="kmRodados"
                        label="KM Rodados"
                        name="kmRodados"
                        value={kmRodados}
                        icon={<Gauge className="text-purple-300"/>}
                        readOnly
                    />
                </FormSection>

                {/* --- HORÁRIOS --- */}
                <FormSection columns={3}>
                    <FormInput
                        id="horaInicial"
                        label="Hora Inicial"
                        name="horaInicial"
                        type="time"
                        value={horaInicial}
                        onChange={(e) => setHoraInicial(e.target.value)}
                    />

                    <FormInput
                        id="horaFinal"
                        label="Hora Final"
                        name="horaFinal"
                        type="time"
                        value={horaFinal}
                        onChange={(e) => setHoraFinal(e.target.value)}
                    />

                    <FormInput
                        id="horasMovimento"
                        label="Horas em Movimento"
                        name="horasMovimento"
                        value={horasMovimento}
                        readOnly
                    />
                </FormSection>

                {/* --- DIA + TIPO DE GASTO --- */}
                <FormSection columns={2}>
                    <FormInput
                        id="dia"
                        label="Dia"
                        name="dia"
                        type="date"
                        icon={<Calendar className="text-blue-400"/>}
                    />

                    <FormSelect
                        id="tipoGasto"
                        label="Tipo de Gasto"
                        icon={<Coins className="text-yellow-400"/>}
                        value={tipoGasto}
                        onChange={(e) => setTipoGasto(e.target.value)}
                        options={[
                            {value: "", label: "Selecione..."},
                            {value: "pedagio", label: "Pedágio"},
                            {value: "abastecimento", label: "Abastecimento"},
                            {value: "alimentacao", label: "Alimentação"},
                            {value: "outro", label: "Outro"},
                        ]}
                    />

                </FormSection>

                {/* --- OBSERVAÇÃO --- */}
                <FormTextarea
                    id="observacao"
                    label="Observação"
                    icon={<FileText className="text-blue-400"/>}
                    placeholder="Escreva observações adicionais..."
                />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-medium text-white shadow-lg">
                    Salvar Despesa
                </button>
            </form>
        </div>
    );
}
