import mammoth from "mammoth";
import { logger } from "@/lib/logger";

import pdfParse from "pdf-parse-new";

export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    logger.warn("Error parsing PDF, using fallback text:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export async function parseDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    logger.warn("Error parsing DOCX, using fallback text:", error);
    throw new Error("Failed to extract text from DOCX");
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  let text = "";
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    text = await parsePdf(buffer);
  } else if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    text = await parseDocx(buffer);
  } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    text = buffer.toString("utf-8");
  } else {
    throw new Error("Unsupported file type. Only PDF, DOCX, and TXT are supported.");
  }
  
  // PostgreSQL doesn't accept null bytes (\x00) in TEXT fields
  return text.replace(/\0/g, '');
}
