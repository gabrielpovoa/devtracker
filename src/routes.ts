import { Car, ClipboardList, LayoutDashboard } from "lucide-react";

export const routes = [
    {
        id: "dashboard",
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        color: "text-indigo-400",
    },
    {
        id: "view-expenses",
        title: "Verificar Despesas",
        path: "/view-expenses",
        icon: ClipboardList,
        color: "text-fuchsia-400",
    },
    {
        id: "register-vehicle",
        title: "Registrar Veículo",
        path: "/register-vehicle",
        icon: Car,
        color: "text-green-400",
    },
];
