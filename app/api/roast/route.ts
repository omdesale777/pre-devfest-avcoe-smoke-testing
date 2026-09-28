import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const code = typeof payload.code === "string" ? payload.code : "";
  const errorMessage = typeof payload.errorMessage === "string" ? payload.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  // 2. Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 4. Validate/fallback language and roastLevel
  const validLanguages = LANGUAGES.map((l) => l.id) as readonly string[];
  const validLevels = ROAST_LEVELS.map((r) => r.id) as readonly string[];

  const language: LanguageId =
    typeof payload.language === "string" && validLanguages.includes(payload.language)
      ? (payload.language as LanguageId)
      : DEFAULTS.language;

  const roastLevel: RoastLevel =
    typeof payload.roastLevel === "string" && validLevels.includes(payload.roastLevel)
      ? (payload.roastLevel as RoastLevel)
      : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    code,
    language,
    roastLevel,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("API /api/roast error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to analyze code with Gemini.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
