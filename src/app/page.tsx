import { Heading } from "@/Components/Heading/Heading";
import Option from "@/Components/Option/Option";
import { LayoutDashboard, Car, ClipboardList } from "lucide-react";
import ExpenseForm from "@/app/add-expense/ExpenseForm";
import {routes} from "@/routes";

export default function Home() {

    return (
        <section className="m-6 md:m-12">

            <Heading
                Title='Controle de KM'
                Fontsize='text-4xl'
                TextTransform="uppercase"
                Weight='font-bold'
                Color="text-white"
                Gapping="mt-12 md:mt-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
                {routes.map((r) => (
                    <Option
                        key={r.id}
                        title={r.title}
                        path={r.path}
                        Icon={r.icon}
                        color={r.color}
                        className="cursor-pointer"
                    />
                ))}
            </div>

            <div>
                <ExpenseForm />
            </div>
        </section>
    );
}
