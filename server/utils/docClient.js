import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from '../config/dynamoClient.js';

const docClient = DynamoDBDocumentClient.from(client);
export default docClient;
