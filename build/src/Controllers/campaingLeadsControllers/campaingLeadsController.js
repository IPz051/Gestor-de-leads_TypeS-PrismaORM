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
exports.CampaignLeadsController = void 0;
const database_1 = require("../../../database");
const campaingSchemas_1 = require("../schemas/campaingSchemas");
class CampaignLeadsController {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(_req.params['campaignId']);
                const query = campaingSchemas_1.getCampaignsRequestSchemas.parse(_req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", orderBy = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = {
                    campaigns: {
                        some: { campaignInt: campaignId }
                    }
                };
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.campaigns = {
                        some: {
                            campaignInt: campaignId,
                            status: { equals: status }
                        }
                    };
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    orderBy: {
                        [sortBy]: orderBy
                    },
                    include: {
                        campaigns: {
                            select: {
                                campaignInt: true,
                                leadInt: true,
                                status: true,
                            },
                            where: {
                                campaignInt: campaignId
                            }
                        }
                    }
                });
                const total = yield database_1.prisma.lead.count({
                    where
                });
                res.json({
                    leads,
                    total,
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    sortBy,
                    orderBy,
                });
            }
            catch (err) {
                next(err);
            }
        });
        this.create = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = campaingSchemas_1.addLeadCampaignRequestSchemas.parse(_req.body);
                const campaignId = Number(_req.params['campaignId']);
                const data = {
                    campaignInt: campaignId,
                    leadInt: body.leadInt
                };
                if (body.status)
                    data.status = body.status;
                const created = yield database_1.prisma.campaignLead.create({
                    data
                });
                res.status(201).json(created);
            }
            catch (err) {
                next(err);
            }
        });
        this.update = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = campaingSchemas_1.updateLeadCampaignRequestSchemas.parse(_req.body);
                const data = {};
                if (body.status)
                    data.status = body.status;
                const updated = yield database_1.prisma.campaignLead.update({
                    where: {
                        leadInt_campaignInt: {
                            campaignInt: Number(_req.params['campaignId']),
                            leadInt: Number(_req.params['leadId']),
                        }
                    },
                    data
                });
                res.json(updated);
            }
            catch (err) {
                next(err);
            }
        });
        this.delete = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(_req.params['campaignId']);
                const leadId = Number(_req.params['leadId']);
                const deleted = yield database_1.prisma.campaignLead.delete({
                    where: {
                        leadInt_campaignInt: {
                            campaignInt: campaignId,
                            leadInt: leadId,
                        }
                    }
                });
                res.json(deleted);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CampaignLeadsController = CampaignLeadsController;
//# sourceMappingURL=campaingLeadsController.js.map