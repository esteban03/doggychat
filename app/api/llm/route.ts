import { NextRequest } from "next/server";
import { getAgent } from "./agent";


export async function POST(request: NextRequest) {

    /*
    const model = new ChatOpenAI({
        model: "gpt-5.1-2025-11-13",
    });

    const response = await model.invoke("Why do parrots talk?");

    return Response.json({"answer": response.content})
     */

    const body = await request.json();

    return getAgent(body);
}
