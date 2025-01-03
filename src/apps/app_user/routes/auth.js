import { Router } from "express";
import { authtenticate, refreshToken } from "../controllers/auth.js";
import transactionHandler from '../../../utils/transactionHandler.js';

const router = Router();

router.post('/', transactionHandler(authtenticate));
router.get('/refresh-token', transactionHandler(refreshToken));

export default router;