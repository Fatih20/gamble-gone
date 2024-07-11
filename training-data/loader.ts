import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

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
  console.log("Loading websites");

  console.log("Loaded websites");

  console.log("Splitting");
  const splitResult = await splitter.splitDocuments(docs);

  return splitResult;
}

export default loadAndSplit;
