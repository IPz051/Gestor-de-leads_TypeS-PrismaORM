"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
exports.app = (0, express_1.default)();
exports.default = exports.app;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static('public'));
exports.app.get('/', (_req, res) => {
    res.redirect('/index.html');
});
exports.app.use("/api", router_1.default);
exports.app.use(errorHandler_1.default);
const PORT = Number(process.env['PORT']) || 3000;
if (require.main === module) {
    exports.app.listen(PORT, () => {
        console.log(`Server iniciado na porta ${PORT}`);
    });
}
//# sourceMappingURL=server.js.map