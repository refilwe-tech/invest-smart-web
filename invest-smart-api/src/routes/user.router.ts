import express from 'express';
import { createUser, getUser, getUsers } from '../controllers';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser)

module.exports = router