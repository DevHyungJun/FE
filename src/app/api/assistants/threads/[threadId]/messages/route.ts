import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

interface Params {
  params: {
    threadId: string;
  };
}

export async function POST(
  request: NextRequest,
  { params: { threadId } }: Params
): Promise<Response> {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
