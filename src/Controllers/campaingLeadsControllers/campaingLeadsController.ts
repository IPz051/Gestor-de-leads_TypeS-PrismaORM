import { Handler } from "express"
import { prisma } from "../../../database"
import type { Prisma } from "@prisma/client"
import { addLeadCampaignRequestSchemas, getCampaignsRequestSchemas, updateLeadCampaignRequestSchemas } from "../schemas/campaingSchemas"


export class CampaignLeadsController {
    index: Handler = async (_req ,res , next) => {
        try{
            const campaignId = Number(_req.params['campaignId'])
            const query = getCampaignsRequestSchemas.parse(_req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "id", orderBy = "asc" } = query
            
            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = {
                campaigns: {
                    some: { campaignInt: campaignId }
                }
            }
            if(name) where.name = {contains: name , mode:"insensitive"}
            if (status) where.campaigns = {
                some: {
                    campaignInt: campaignId,
                    status: { equals: status }
                }
            }

            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                orderBy: {
                    [sortBy]: orderBy
                },
                include: {
                    groups: true,
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
        }catch(err){
            next(err)
        }
    }

    create: Handler = async (_req ,res , next) => {
        try{
            const body = addLeadCampaignRequestSchemas.parse(_req.body)
            const campaignId = Number(_req.params['campaignId'])
            
            const data: Prisma.CampaignLeadUncheckedCreateInput = {
                campaignInt: campaignId,
                leadInt: body.leadInt
            }
            if (body.status) data.status = body.status

            const created = await prisma.campaignLead.create({
                data
            })
            res.status(201).json(created)
        }catch(err){
            next(err)
        }
    }

    update: Handler = async (_req ,res , next) => {
        try{
            const body = updateLeadCampaignRequestSchemas.parse(_req.body)
            
            const data: Prisma.CampaignLeadUncheckedUpdateInput = {}
            if (body.status) data.status = body.status

            const updated = await prisma.campaignLead.update({
                where: {
                    leadInt_campaignInt: {
                        campaignInt: Number(_req.params['campaignId']),
                        leadInt: Number(_req.params['leadId']),
                    }
                },
                data
            })
            res.json(updated)
        }catch(err){
            next(err)
        }
    }

    delete: Handler = async (_req ,res , next) => {
        try{
            const campaignId = Number(_req.params['campaignId'])
            const leadId = Number(_req.params['leadId'])
            const deleted = await prisma.campaignLead.delete({
                where: {
                    leadInt_campaignInt: {
                        campaignInt: campaignId,
                        leadInt: leadId,
                    }
                }
            })
            res.json(deleted)
        }catch(err){
            next(err)
        }
    }
}
