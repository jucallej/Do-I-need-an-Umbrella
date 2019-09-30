import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/needUmbrella', (req: express.Request, res: express.Response, next) => {
  res.json({ shouldUseUmbrella: false });
});

export default router;
