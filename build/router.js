import { Router } from "express";
const router = Router();
router.get('/test', (_req, res) => {
    res.send('Hello World!');
});
export default router;
//# sourceMappingURL=router.js.map