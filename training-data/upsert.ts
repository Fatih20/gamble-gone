import loadAndSplit from "./loader";
import envVar from "./envVar";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import getArgVariable from "./getArgVariable";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { Index } from "@upstash/vector";
import { getUpsertMetadata, saveUpsertMetadata } from "./manageUpsertMetadata";
import { Document } from "@langchain/core/documents";

// const pc = new Pinecone({
//   apiKey: envVar.pineconeAPIKey,
// });

// const index = pc.index(envVar.pineconeIndex);

const indexWithCredentials = new Index({
  url: envVar.upstashVectorRestURL,
  token: envVar.upstashVectorRestToken,
});

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: envVar.huggingFaceToken,
  //   model: "sentence-transformers/all-MiniLM-L6-v2",
  model: "intfloat/multilingual-e5-large",
  onFailedAttempt: () => {
    console.log("Failed embedding");
  },
  maxConcurrency: 20,
  maxRetries: 10,
});

const UpstashVector = new UpstashVectorStore(embeddings, {
  index: indexWithCredentials,
});

// const embeddings = new OpenAIEmbeddings();

function partition<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

function getMetadata(docs: Document<Record<string, any>>[]) {
  const docsChunkId = docs.map(({ id }) => id ?? "").filter((id) => id !== "");
  const docsName = Array.from(
    new Set(docs.map(({ metadata: { name } }) => name))
  );

  return {
    docsChunkId,
    docsName,
  };
}

async function upsert() {
  const deleteAll = (getArgVariable("delete") ?? "false") === "true";
  const {
    result: docs,
    loadedDocsChunkId,
    loadedDocsName,
  } = await loadAndSplit();

  const { upsertedDocsChunkId, upsertedDocsName } = await getUpsertMetadata();

  const toUpsertDocs = docs.filter(({ metadata: { name }, id }) => {
    return upsertedDocsChunkId.indexOf(id ?? "") === -1;
  });

  const newUpsertedDocsChunkId = [...upsertedDocsChunkId];

  const newUpsertedDocsName = [...upsertedDocsName];

  console.log("Emptying the index");
  if (deleteAll) {
    UpstashVector.delete({ deleteAll: true });
  }
  console.log("Emptied the index");
  console.log("Upserting the docs");

  const docsPartitions = partition(toUpsertDocs, 5);
  console.log(
    `Partitioned the result into ${docsPartitions.length} partitions`
  );
  try {
    for (let i = 0; i < docsPartitions.length; i++) {
      console.log(`Upserting ${i}-th batch`);
      const docsPartition = docsPartitions[i];
      await UpstashVector.addDocuments(docsPartition);
      const { docsChunkId, docsName } = getMetadata(docsPartition);
      docsChunkId.forEach((chunkId) => newUpsertedDocsChunkId.push(chunkId));
      docsName.forEach((name) => newUpsertedDocsName.push(name));
      console.log(`Upserted ${i}-th batch`);
    }
  } catch (e) {
    console.log("Error when upserting!");
    console.log(e);
  } finally {
    await saveUpsertMetadata({
      upsertedDocsChunkId: newUpsertedDocsChunkId,
      upsertedDocsName: Array.from(new Set(newUpsertedDocsName)),
    });
  }

  console.log("Upserted the docs");
}
export default upsert;

(async () => {})();

// console.log(envVar);

// const client = weaviate.client({
//   scheme: envVar.weaviateScheme,
//   host: envVar.weaviateHost,
//   apiKey: new ApiKey(envVar.weaviateAPIKey || "default"),
// });

// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: envVar.huggingFaceToken,
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

// (async () => {
//   const docs = await loadAndSplit();
//   console.log("Upserting the docs");

//   await WeaviateStore.fromDocuments(docs, embeddings, {
//     client,
//     indexName: envVar.weaviateIndex,
//   });
//   console.log("Upserted the docs");
// })();
