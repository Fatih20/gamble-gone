const envVar = {
  anthropicAPIKey: (process.env.ANTHROPIC_API_KEY ?? "") as string,
  langsmithAPIKey: (process.env.LANGSMITH_API_KEY ?? "") as string,
  langchainProject: (process.env.LANGCHAIN_PROJECT ?? "") as string,
  langchainTracingV2: (process.env.LANGCHAIN_TRACING_V2 ?? "") as string,
  huggingFaceToken: (process.env.HUGGING_FACE_TOKEN ?? "") as string,
  upstashVectorRestURL: (process.env.UPSTASH_VECTOR_REST_URL ?? "") as string,
  upstashVectorRestToken: (process.env.UPSTASH_VECTOR_REST_TOKEN ??
    "") as string,
};

export default envVar;
