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
exports.GroupsLeadsController = void 0;
const leadsRequestSchemas_1 = require("../schemas/leadsRequestSchemas");
const database_1 = require("../../../database");
const groupsRequestSchemas_1 = require("../schemas/groupsRequestSchemas");
class GroupsLeadsController {
    constructor() {
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params['groupId']);
                const query = leadsRequestSchemas_1.GetLeadRequestSchemas.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "id", orderBy = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = {
                    groups: {
                        some: {
                            id: groupId
                        }
                    }
                };
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    orderBy: {
                        [sortBy]: orderBy
                    },
                    include: {
                        groups: true
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
        this.addLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = groupsRequestSchemas_1.addLeadsToGroupRequestSchemas.parse(req.body);
                const updateGroup = yield database_1.prisma.group.update({
                    where: {
                        id: Number(req.params['groupId'])
                    },
                    data: {
                        leads: {
                            connect: {
                                id: Number(body.leadId)
                            }
                        }
                    }
                });
                res.json(updateGroup).status(201);
            }
            catch (error) {
                next(error);
            }
        });
        this.removeLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const leadId = Number(req.params['leadId']);
                const updateGroup = yield database_1.prisma.group.update({
                    where: {
                        id: Number(req.params['groupId'])
                    },
                    data: {
                        leads: {
                            disconnect: {
                                id: leadId
                            }
                        }
                    }
                });
                res.json(updateGroup).status(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupsLeadsController = GroupsLeadsController;
//# sourceMappingURL=groupsLeadsController.js.map