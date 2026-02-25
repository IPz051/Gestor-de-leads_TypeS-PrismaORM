"use strict";
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
exports.CampaignController = void 0;
const database_1 = require("../../../database");
const campaingSchemas_1 = require("../schemas/campaingSchemas");
class CampaignController {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaigns = yield database_1.prisma.campaign.findMany();
                res.json(campaigns);
            }
            catch (err) {
                next(err);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const body = campaingSchemas_1.createCampaignRequestSchemas.parse(req.body);
                const data = {
                    name: body.name,
                    description: (_a = body.description) !== null && _a !== void 0 ? _a : null,
                    startDate: body.startDate,
                    endDate: (_b = body.endDate) !== null && _b !== void 0 ? _b : null,
                };
                const newCampaign = yield database_1.prisma.campaign.create({
                    data
                });
                res.status(201).json(newCampaign);
            }
            catch (err) {
                next(err);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const campaign = yield database_1.prisma.campaign.findUnique({
                    where: {
                        id: Number(id),
                    },
                    include: {
                        leads: {
                            include: {
                                lead: true,
                            }
                        }
                    }
                });
                if (!campaign) {
                    res.status(404).json({ error: "Campaign not found" });
                    return;
                }
                res.json(campaign);
            }
            catch (err) {
                next(err);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = campaingSchemas_1.updateCampaignRequestSchemas.parse(req.body);
                const campaign = yield database_1.prisma.campaign.findUnique({
                    where: {
                        id: Number(id),
                    }
                });
                if (!campaign) {
                    res.status(404).json({ error: "Campaign not found" });
                    return;
                }
                const data = {};
                if (body.name)
                    data.name = body.name;
                if (body.description)
                    data.description = body.description;
                if (body.startDate)
                    data.startDate = body.startDate;
                if (body.endDate)
                    data.endDate = body.endDate;
                const updatedCampaign = yield database_1.prisma.campaign.update({
                    where: {
                        id: Number(id),
                    },
                    data
                });
                res.json(updatedCampaign);
            }
            catch (err) {
                next(err);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const campaign = yield database_1.prisma.campaign.findUnique({
                    where: {
                        id: Number(id),
                    }
                });
                if (!campaign) {
                    res.status(404).json({ error: "Campaign not found" });
                    return;
                }
                yield database_1.prisma.campaign.delete({
                    where: {
                        id: Number(id),
                    }
                });
                res.status(204).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CampaignController = CampaignController;
//# sourceMappingURL=campaingController.js.map