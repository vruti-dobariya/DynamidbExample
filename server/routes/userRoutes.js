import express from 'express';
import { addUser, getUsers, updateUser, deleteUser, createTable } from '../controllers/userController.js';

const router = express.Router();

router.post('/add-user', addUser);
router.get('/users', getUsers);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);
router.post('/create-table', createTable);

export default router;