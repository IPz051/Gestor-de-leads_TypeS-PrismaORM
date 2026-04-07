"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use("/api", router_1.default);
app.use(errorHandler_1.default);
const PORT = Number(process.env['PORT']) || 3000;
app.listen(PORT, () => {
    console.log(`Server iniciado em http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map