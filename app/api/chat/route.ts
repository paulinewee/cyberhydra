import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content:
          "You are a cybersecurity AI assistant. Provide expert guidance on cybersecurity matters, threat detection, and best practices for small to medium businesses. Be concise and practical in your responses.",
      },
      ...messages,
    ],
  })

  return result.toDataStreamResponse()
}

