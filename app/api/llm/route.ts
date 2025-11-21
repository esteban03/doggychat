import { NextRequest } from "next/server";
import { getAgent } from "./agent";


export async function POST(request: NextRequest) {
    const body = await request.json();
    
    const { apiKey, ...rest } = body;

    if (!apiKey) {
        return Response.json(
            { error: "OpenAI API Key is required" },
            { status: 400 }
        );
    }

    return getAgent({
        ...rest,
        apiKey: apiKey,
    });
}
