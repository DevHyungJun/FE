import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const { content } = await request.json();
    const threadId = params.threadId;

    // Add the message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });

    // Run the assistant
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID is not defined");
    }

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId, // OpenAI Assistant ID 입력
    });

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const runStatus = await openai.beta.threads.runs.retrieve(
            threadId,
            run.id
          );

          if (runStatus.status === "completed") {
            const messages = await openai.beta.threads.messages.list(threadId);
            const lastMessage = messages.data[0];

            controller.enqueue(
              `event: message\ndata: ${JSON.stringify(lastMessage)}\n\n`
            );
            controller.close();
            break;
          } else if (runStatus.status === "failed") {
            controller.error("Run failed");
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
