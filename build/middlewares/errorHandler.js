import { HttpError } from "../errors/HttpError";
export default function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    if (err && err.message) {
        res.status(500).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: "Erro interno do servidor,desconhecido" });
}
//# sourceMappingURL=errorHandler.js.map