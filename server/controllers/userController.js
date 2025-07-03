import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../utils/docClient.js';

export const addUser = async (req, res) => {
  const { id, name } = req.body;
  try {
    await docClient.send(new PutCommand({
      TableName: 'user',
      Item: { id, name }
    }));
    res.status(200).json({ message: 'User added' });
  } catch (err) {
    console.error('Add Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: 'user' }));
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
      TableName: 'user',
      Key: { id },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': name }
    }));
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await docClient.send(new DeleteCommand({
      TableName: 'user',
      Key: { id }
    }));
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
