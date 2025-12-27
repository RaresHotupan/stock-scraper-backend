import express from 'express';
import {getHomePage, getSp500, getSp500Stats} from '../controllers/homeController';

const router = express.Router();

router.get('/', getHomePage);
router.get('/sp500', getSp500);
router.get('/sp500/stats/:symbol', getSp500Stats);

export default router;
