import { ApiError, GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const defaultMsg =
    error instanceof Error ? error.message : "An unexpected AI error occurred.";

  switch (status) {
    case 400:
      return "Bad request. Please verify the submitted code format or check your model configuration.";
    case 403:
      return "Access denied (403). Your GEMINI_API_KEY might be invalid or restricted. Check .env.local.";
    case 404:
      return `Model not found (404). Please verify that the model '${AI.model}' is supported for your API key in config/app.config.ts.`;
    case 429:
      return "Rate limit exceeded (429). Bhai, thoda ruk, roast ko bhi marinate hone do! Try again in a few moments.";
    case 503:
      return "Gemini service temporarily overloaded (503). Retried multiple times, but server is busy. Please try again shortly.";
    default:
      return defaultMsg;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received empty response from Gemini API.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`Failed to parse AI response as JSON: ${jsonErr}`);
      }

      return {
        roast: parsed.roast ?? "Wah bhau, kya code likha hai!",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "Code improve karte raho!",
      };
    } catch (err: unknown) {
      lastError = err;
      const status =
        err instanceof ApiError
          ? err.status
          : typeof err === "object" && err !== null && "status" in err
          ? (err as { status: number }).status
          : undefined;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
