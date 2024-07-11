import dotenv from "dotenv";
dotenv.config();

const envVar = {
  port: (process.env.PORT || 5000) as number,
  anthropicAPIKey: (process.env.ANTHROPIC_API_KEY ?? "") as string,
  langsmithAPIKey: (process.env.LANGSMITH_API_KEY ?? "") as string,
  pineconeAPIKey: (process.env.PINECONE_API_KEY ?? "") as string,
  pineconeIndex: (process.env.PINECONE_INDEX ?? "") as string,
  huggingFaceToken: (process.env.HUGGING_FACE_TOKEN ?? "") as string,
  weaviateAPIKey: (process.env.WEAVIATE_API_KEY ?? "") as string,
  weaviateScheme: (process.env.WEAVIATE_SCHEME ?? "https") as string,
  weaviateHost: (process.env.WEAVIATE_HOST ?? "localhost") as string,
  weaviateIndex: (process.env.WEAVIATE_INDEX ?? "") as string,
  upstashVectorRestURL: (process.env.UPSTASH_VECTOR_REST_URL ?? "") as string,
  upstashVectorRestToken: (process.env.UPSTASH_VECTOR_REST_TOKEN ??
    "") as string,
};

export default envVar;
