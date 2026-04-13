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
exports.GroupsController = void 0;
const groupsRequestSchemas_1 = require("../schemas/groupsRequestSchemas");
const database_1 = require("../../../database");
class GroupsController {
    constructor() {
        this.index = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield database_1.prisma.group.findMany({
                    orderBy: {
                        id: 'asc'
                    }
                });
                res.json(groups);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const body = groupsRequestSchemas_1.createGroupRequestSchemas.parse(req.body);
                const data = {
                    name: body.name,
                    description: (_a = body.description) !== null && _a !== void 0 ? _a : null
                };
                const newGroup = yield database_1.prisma.group.create({
                    data
                });
                res.status(201).json(newGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params['id']);
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: groupId },
                    include: { leads: true }
                });
                if (!group) {
                    res.status(404).json({ message: 'Grupo não encontrado' });
                    return;
                }
                res.json(group);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params['id']);
                const body = groupsRequestSchemas_1.updateGroupRequestSchemas.parse(req.body);
                const data = {};
                if (body.name)
                    data.name = body.name;
                if (body.description)
                    data.description = body.description;
                const updatedGroup = yield database_1.prisma.group.update({
                    where: {
                        id: groupId,
                    },
                    data
                });
                res.json(updatedGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params['id']);
                const deletedGroup = yield database_1.prisma.group.delete({
                    where: {
                        id: groupId,
                    }
                });
                res.json(deletedGroup);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupsController = GroupsController;
//# sourceMappingURL=groupsController.js.map