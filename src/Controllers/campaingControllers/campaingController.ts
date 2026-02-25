import { Handler } from "express"
import { prisma } from "../../../database"
import { createCampaignRequestSchemas, updateCampaignRequestSchemas } from '../schemas/campaingSchemas';
import type { Prisma } from "@prisma/client";

export class CampaignController {
    index: Handler = async (_req, res, next) => {
        try {
            const campaigns = await prisma.campaign.findMany()
            res.json(campaigns)
        } catch (err) {
            next(err)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const body = createCampaignRequestSchemas.parse(req.body)
            const data: Prisma.CampaignCreateInput = {
                name: body.name,
                description: body.description ?? null,
                startDate: body.startDate,
                endDate: body.endDate ?? null,
            }
            const newCampaign = await prisma.campaign.create({
                data
            })
            res.status(201).json(newCampaign)
        } catch (err) {
            next(err)
        }
    }
    show: Handler = async (req, res, next) => {
        try {
            const { id } = req.params
            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    leads : {
                        include: {
                            lead: true,
                        }
                    }
                }
            })
            if (!campaign) {
                res.status(404).json({ error: "Campaign not found" })
                return
            }
            res.json(campaign)
        } catch (err) {
            next(err)
        }
    }
    update: Handler = async (req, res, next) => {
        try {
            const { id } = req.params
            const body = updateCampaignRequestSchemas.parse(req.body)
            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: Number(id),
                }
            })
            if (!campaign) {
                res.status(404).json({ error: "Campaign not found" })
                return
            }

            const data: Prisma.CampaignUpdateInput = {}
            if (body.name) data.name = body.name
            if (body.description) data.description = body.description
            if (body.startDate) data.startDate = body.startDate
            if (body.endDate) data.endDate = body.endDate

            const updatedCampaign = await prisma.campaign.update({
                where: {
                    id: Number(id),
                },
                data
            })
            res.json(updatedCampaign)
        } catch (err) {
            next(err)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const { id } = req.params
            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: Number(id),
                }
            })
            if (!campaign) {
                res.status(404).json({ error: "Campaign not found" })
                return
            }
            await prisma.campaign.delete({
                where: {
                    id: Number(id),
                }
            })
            res.status(204).json()
        } catch (err) {
            next(err)
        }
    }
}
