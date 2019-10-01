import express from 'express';
const router = express.Router();

router.get('/needUmbrella', (req: express.Request, res: express.Response) => {
    res.json({ shouldUseUmbrella: false });
});

export default router;
