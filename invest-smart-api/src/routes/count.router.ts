import express from 'express';
import { getCounts } from '../controllers';

const router = express.Router();

router.get('/counts', getCounts)

module.exports = router