import { openai } from "@/app/openai";

// Send a new message to a thread
interface RequestParams {
  params: {
    threadId: string;
  };
}

interface ToolCallOutputs {
  tool_outputs: Array<{
    output: any;
    tool_call_id: string;
  }>;
}

interface RequestBody {
  toolCallOutputs: ToolCallOutputs;
  runId: string;
}

export async function POST(
  request: Request,
  { params: { threadId } }: RequestParams
): Promise<Response> {
  const { toolCallOutputs, runId }: RequestBody = await request.json();
  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    { tool_outputs: toolCallOutputs.tool_outputs }
  );

  return new Response(stream.toReadableStream());
}
