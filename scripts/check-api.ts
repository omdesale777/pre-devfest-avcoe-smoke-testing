import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`🔍 Testing Gemini connection with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n🔥 Gemini API Check SUCCESS!\n");
    console.log("Roast:\n", result.roast);
    console.log(`\nDetected Issues (${result.issues.length}):`);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log("\nCorrected Code Preview:\n", result.correctedCode.slice(0, 120), "...");
    console.log("\nTakeaway:\n", result.takeaway);
  } catch (error) {
    console.error("\n❌ Gemini API Check FAILED:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
