import express from 'express';
import { shouldUseUmbrella } from '../service/needUmbrellaService';
const router = express.Router();

router.get(
    '/needUmbrella',
    async (req: express.Request, res: express.Response) => {
        const umbrellaNeeded = await shouldUseUmbrella(
            Number(req.query.lat),
            Number(req.query.lon)
        );
        res.json({ shouldUseUmbrella: umbrellaNeeded });
    }
);

export default router;
