import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    // Criar um veículo
    await prisma.vehicle.create({
        data: {
            plate: "ABC-1234",
            model: "Fiat Uno",
        },
    });

    // Buscar todos
    const vehicles = await prisma.vehicle.findMany();

    console.log("Veículos cadastrados:");
    console.log(vehicles);
}

main()
    .catch((err) => console.error(err))
    .finally(async () => await prisma.$disconnect());
