
import express from "express";
import {TRADE_ROUTES} from '../utils/endpoints.js'
import {buyAsset,sellAsset,getBalance,getAllAssets} from '../controllers/trade_controller.js'
import {verifyJWT} from '../middleware/auth_middleware.js'
const router = express.Router()

router.post(TRADE_ROUTES.BUY,verifyJWT,buyAsset);
router.post(TRADE_ROUTES.SELL,verifyJWT,sellAsset);
router.get(TRADE_ROUTES.CHECK_BALANCE,getBalance);
router.get(TRADE_ROUTES.ASSET,getAllAssets)

export default router;