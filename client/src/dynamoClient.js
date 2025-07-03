import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000", // for local development
  credentials: {
    accessKeyId: "fakeMyKeyId",      // Dummy credentials for local
    secretAccessKey: "fakeSecretAccessKey"
  }
});

export default client;
