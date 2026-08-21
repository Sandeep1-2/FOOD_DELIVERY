import fs from "fs";

export const uploadsDirectory = process.env.UPLOADS_DIR || "uploads";

fs.mkdirSync(uploadsDirectory, { recursive: true });
