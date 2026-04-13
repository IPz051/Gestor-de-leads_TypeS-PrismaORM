import { Handler } from "express";
import { GetLeadRequestSchemas } from "../schemas/leadsRequestSchemas";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../../database";
import { addLeadsToGroupRequestSchemas } from "../schemas/groupsRequestSchemas";

export class GroupsLeadsController {
    getLeads: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params['groupId'])
            const query = GetLeadRequestSchemas.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "id", orderBy = "asc" } = query
    
            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)
    
            const where: Prisma.LeadWhereInput = {
                groups: {
                    some: {
                        id: groupId
                    }
                }
            }
            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.status = status
    
            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                orderBy: {
                    [sortBy]: orderBy
                },
                include: {
                    groups: true
                }
            })
    
            const total = await prisma.lead.count({
                where
            })
            res.json({
                leads,
                total,
                page: pageNumber,
                pageSize: pageSizeNumber,
                sortBy,
                orderBy,
            })
        } catch (err) {
            next(err)
        }
    }
    addLeads: Handler = async (req, res, next) => {
        try {
            const body = addLeadsToGroupRequestSchemas.parse(req.body)
            const updateGroup = await prisma.group.update({
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
            })
            res.json(updateGroup).status(201)
        } catch (error) {
            next(error)
        }
    }
    removeLeads: Handler = async (req, res, next) => {
        try {
            const leadId = Number(req.params['leadId'])
            const updateGroup = await prisma.group.update({
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
            })
            res.json(updateGroup).status(200)
        } catch (error) {
            next(error)
        }
    }
}
