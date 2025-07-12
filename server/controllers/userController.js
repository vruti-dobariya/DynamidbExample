import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import docClient from "../utils/docClient.js";
import client from "../utils/rawClient.js";

export const addUser = async (req, res) => {
  const item = req.body;
  console.log('Received item:', item); // Debug log
  if (!item.id) return res.status(400).json({ error: 'Missing id field' });

  try {
    await docClient.send(new PutCommand({
      TableName: "user",
      Item: item
    }));
    res.status(200).json({ message: "User added", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: "user" }));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await docClient.send(new UpdateCommand({
      TableName: "user",
      Key: { id },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: { ":name": name }
    }));
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await docClient.send(new DeleteCommand({
      TableName: "user",
      Key: { id }
    }));
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTable = async (req, res) => {
  try {
    const existing = await client.send(new ListTablesCommand({}));
    if (existing.TableNames.includes("user")) {
      return res.json({ message: "Table already exists" });
    }

    const params = {
      TableName: "user",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    await client.send(new CreateTableCommand(params));
    res.json({ message: "Table created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
