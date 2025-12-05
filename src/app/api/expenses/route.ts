import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ======================
// GET /api/expenses
// ======================
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const vehicleId = searchParams.get("vehicleId");
        const colaborador = searchParams.get("colaborador");
        const tipoGasto = searchParams.get("tipoGasto");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const filters: any = {};

        if (vehicleId) filters.vehicleId = Number(vehicleId);
        if (colaborador) filters.colaborador = colaborador;
        if (tipoGasto) filters.tipoGasto = tipoGasto;

        if (startDate || endDate) {
            filters.dia = {};
            if (startDate) filters.dia.gte = new Date(startDate);
            if (endDate) filters.dia.lte = new Date(endDate);
        }

        const expenses = await prisma.expense.findMany({
            where: filters,
            orderBy: { dia: "desc" },
            include: {
                vehicle: true,
            },
        });

        const vehicles = await prisma.vehicle.findMany();
        const workers = await prisma.expense.findMany({
            distinct: ["colaborador"],
            select: { colaborador: true },
        });

        return NextResponse.json({
            expenses,
            vehicles,
            workers,
        });
    } catch (error) {
        console.error("Erro GET /expenses:", error);
        return NextResponse.json(
            { error: "Erro ao buscar despesas" },
            { status: 500 }
        );
    }
}


// ======================
// POST /api/expenses
// ======================
export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.dia || isNaN(Date.parse(data.dia))) {
            return NextResponse.json(
                { error: "O campo 'dia' precisa ser uma data válida (YYYY-MM-DD)." },
                { status: 400 }
            );
        }

        const expense = await prisma.expense.create({
            data: {
                colaborador: data.colaborador,
                vehicleId: Number(data.vehicleId),
                tipoGasto: data.tipoGasto,
                kmInicial: Number(data.kmInicial),
                kmFinal: Number(data.kmFinal),
                kmRodados: Number(data.kmRodados),
                horaInicial: data.horaInicial,
                horaFinal: data.horaFinal,
                horasMovimento: data.horasMovimento,
                dia: new Date(data.dia),
                observacao: data.observacao || "",
            },
        });

        return NextResponse.json(expense, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar despesa:", error);
        return NextResponse.json(
            { error: "Erro ao criar despesa" },
            { status: 500 }
        );
    }
}
