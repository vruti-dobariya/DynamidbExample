import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const rawClient = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  }
});

export default rawClient;