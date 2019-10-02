import express from 'express';
import { shouldUseUmbrella } from '../service/needUmbrellaService';
const router = express.Router();

router.get('/needUmbrella', (req: express.Request, res: express.Response) => {
    res.json({ shouldUseUmbrella: shouldUseUmbrella() });
});

export default router;
