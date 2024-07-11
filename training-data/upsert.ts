import loadAndSplit from "./loader";
import envVar from "./envVar";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import getArgVariable from "./getArgVariable";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { Index } from "@upstash/vector";

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
});

const UpstashVector = new UpstashVectorStore(embeddings, {
  index: indexWithCredentials,
});

// const embeddings = new OpenAIEmbeddings();

(async () => {
  const deleteAll = (getArgVariable("delete") ?? "false") === "true";
  const docs = await loadAndSplit();
  console.log("Emptying the index");
  if (deleteAll) {
    // await index.deleteAll();
    UpstashVector.delete({ deleteAll: true });
  }
  console.log("Emptied the index");
  console.log("Upserting the docs");
  await UpstashVector.addDocuments(docs);
  // await PineconeStore.fromDocuments(docs, embeddings, {
  //   pineconeIndex: index,
  //   maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  //   maxRetries: 3,
  //   onFailedAttempt: (error) => console.error(error),
  // });
  console.log("Upserted the docs");
})();

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
