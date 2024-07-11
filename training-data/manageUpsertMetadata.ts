import { promises as fs } from "fs";

export interface UpsertMetadata {
  upsertedDocsName: string[];
  upsertedDocsChunkId: string[];
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData: T = JSON.parse(data);
    return jsonData;
  } catch (error) {
    throw new Error(`Failed to read JSON file: ${error}`);
  }
}

async function saveJsonFile<T>(filePath: string, data: T) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read JSON file: ${error}`);
  }
}

export async function getUpsertMetadata() {
  return await readJsonFile<UpsertMetadata>("./upsertMetadata.json");
}

export async function saveUpsertMetadata(data: UpsertMetadata) {
  return await saveJsonFile<UpsertMetadata>("./upsertMetadata.json", data);
}

export async function resetUpsertMetadata() {
  return await saveJsonFile<UpsertMetadata>("./upsertMetadata.json", {
    upsertedDocsChunkId: [],
    upsertedDocsName: [],
  });
}
