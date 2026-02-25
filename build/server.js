import cors from 'cors';
import express from 'express';
import router from './router';
import errorHandler from './middlewares/errorHandler';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
const PORT = Number(process.env['PORT']) || 3000;
app.listen(PORT, () => {
    console.log(`Server iniciado em http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map