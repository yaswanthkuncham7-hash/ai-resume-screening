import mammoth from "mammoth";
import { logger } from "@/lib/logger";

export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import for code splitting — pdf-parse (~2MB) only loaded when needed
    const pdfModule: any = await import("pdf-parse-new");
    const pdfParse = pdfModule.default || pdfModule;
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
  
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    return parsePdf(buffer);
  } else if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    return parseDocx(buffer);
  } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

  throw new Error("Unsupported file type. Only PDF, DOCX, and TXT are supported.");
}
