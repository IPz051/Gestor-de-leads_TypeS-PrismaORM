"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsController = void 0;
const index_1 = require("../../database/index");
const leadsRequestSchemas_1 = __importStar(require("./schemas/leadsRequestSchemas"));
class LeadsController {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = leadsRequestSchemas_1.GetLeadRequestSchemas.parse(_req.query);
                const { page = 1, pageSize = 10, name, status, sortBy = "name", orderBy = "asc" } = query;
                const where = {};
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = { equals: status };
                const leads = yield index_1.prisma.lead.findMany({
                    where,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { [sortBy]: orderBy }
                });
                const total = yield index_1.prisma.lead.count({ where });
                res.json({
                    leads,
                    total,
                    page,
                    pageSize,
                    sortBy,
                    orderBy,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const body = leadsRequestSchemas_1.default.parse(req.body);
                const data = {
                    name: body.name,
                    email: body.email,
                    phone: (_a = body.phone) !== null && _a !== void 0 ? _a : null,
                };
                if (body.status !== undefined) {
                    data.status = body.status;
                }
                const newLead = yield index_1.prisma.lead.create({ data });
                res.status(201).json(newLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params['id']);
                if (!Number.isInteger(id) || id <= 0) {
                    res.status(400).json({ message: "id inválido" });
                    return;
                }
                const lead = yield index_1.prisma.lead.findUnique({
                    where: { id },
                    include: { groups: true }
                });
                if (lead === null) {
                    res.status(404).json({ message: "Lead não encontrado" });
                    return;
                }
                res.json(lead);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = Number(req.params['id']);
                if (!Number.isInteger(id) || id <= 0) {
                    res.status(400).json({ message: "id inválido" });
                    return;
                }
                const body = leadsRequestSchemas_1.default.parse(req.body);
                const data = {
                    name: body.name,
                    email: body.email,
                    phone: (_a = body.phone) !== null && _a !== void 0 ? _a : null,
                };
                if (body.status !== undefined) {
                    data.status = body.status;
                }
                const updatedLead = yield index_1.prisma.lead.update({
                    where: { id },
                    data
                });
                res.json(updatedLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params['id']);
                if (!Number.isInteger(id) || id <= 0) {
                    res.status(400).json({ message: "id inválido" });
                    return;
                }
                const deletedLead = yield index_1.prisma.lead.delete({
                    where: { id }
                });
                res.json(deletedLead);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LeadsController = LeadsController;
//# sourceMappingURL=leadsControllers.js.map