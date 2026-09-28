import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The primary witty roast in Hinglish.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of detected issues, sorted by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Issue severity level.",
          },
          title: {
            type: Type.STRING,
            description: "Short punchy title in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact snippet of problematic code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Diagnosis explanation in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "Expected fix explanation in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete corrected code snippet without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short final takeaway or advice in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
