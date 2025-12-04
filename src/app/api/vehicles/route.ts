import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const vehicles = await prisma.vehicle.findMany({
        orderBy: { id: "desc" },
    });

    return NextResponse.json(vehicles);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const vehicle = await prisma.vehicle.create({
            data: {
                plate: body.plate,
                model: body.model,
                brand: body.brand ?? null,
                year: body.year || null,
            },
        });

        return NextResponse.json(vehicle, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar veículo" }, { status: 500 });
    }
}
