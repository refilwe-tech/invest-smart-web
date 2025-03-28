import express from 'express';
import { getInvestments } from "../controllers";

const router = express.Router();

router.get("/investments", getInvestments);

module.exports = router;
