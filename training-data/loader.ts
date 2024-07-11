import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getUpsertMetadata, saveUpsertMetadata } from "./manageUpsertMetadata";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

async function loadAndSplit(directory: string = "gambling") {
  const loader = new DirectoryLoader(`documents/${directory}`, {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
    ".pdf": (path: string) => new PDFLoader(path),
  });

  console.log("Loading documents");
  const docs = await loader.load();
  console.log("Loaded documents");

  const loadedDocsMetadata = docs.map(({ metadata }) => {
    const nameSplit = (metadata["source"] as string).split("/");
    const name = nameSplit[nameSplit.length - 1];
    const nameSplitSplit = name.split(".");
    const type = nameSplitSplit[nameSplitSplit.length - 1];
    const pagePos =
      type === "pdf"
        ? (metadata["loc"].pageNumber as number)
        : type === "csv"
        ? 0
        : 1;
    return { name, pagePos, type };
  });

  const loadedDocsName = Array.from(
    new Set(loadedDocsMetadata.map(({ name }) => name))
  );

  const upsertMetadata = await getUpsertMetadata();

  upsertMetadata.upsertedDocsName = loadedDocsName;

  saveUpsertMetadata(upsertMetadata);

  console.log("Splitting documents");
  const splitResult = await splitter.splitDocuments(docs);
  console.log("Split documents");

  return { result: splitResult, loadedDocsName };
}

export default loadAndSplit;
