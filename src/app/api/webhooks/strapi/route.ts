import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Obtenemos evento, modelo y la entrada
        const { event, model, entry } = await request.json();

        // Si el evento no es válido, devolvemos un error
        if (!validEvents.includes(event)) {
            return NextResponse.json({ status: 400 });
        }

        // Si el modelo no es válido, devolvemos un error
        if (!(model in pluralizedModels)) {
            return NextResponse.json({ status: 400 });
        }

        // Revalidamos paths según el modelo y el id de la entrada
        revalidatePaths(pluralizedModels[model], entry.id);

        return NextResponse.json({ status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500 });
    }
}

const revalidatePaths = (pluralizedModel: string, id: string) => {
    console.log(`⚙️  Revalidando path \`/${pluralizedModel}\` ...`);
    revalidatePath(`/${pluralizedModel}/${id}`);
    revalidatePath(`/${pluralizedModel}`);
    console.log("👍 Paths revalidados correctamente.");
};

const validEvents = [
    "entry.create",
    "entry.update",
    "entry.delete",
    "entry.publish",
    "entry.unpublish",
];

const pluralizedModels: { [key: string]: string } = {
    part: "parts",
    motiu: "motius",
    treballador: "treballadors",
    ubicacio: "ubicacions",
    configuracio: "configuracions",
    "categoria-treballador": "categoria-treballadors",
    brigada: "brigades",
    tipus: "tipus",
};
