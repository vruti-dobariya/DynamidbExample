import express from 'express';
import { addUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/add-user', addUser);
router.get('/users', getUsers);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
