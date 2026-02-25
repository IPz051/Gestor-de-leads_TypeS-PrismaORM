import { Handler } from "express";
import { createGroupRequestSchemas, updateGroupRequestSchemas } from "../schemas/groupsRequestSchemas";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../../database";

export class GroupsController {
    index: Handler = async (_req, res, next) => {
        try {
            const groups = await prisma.group.findMany()
            res.json(groups)

        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = createGroupRequestSchemas.parse(req.body)
            const data: Prisma.GroupCreateInput = {
                name: body.name,
                description: body.description ?? null
            }
            const newGroup = await prisma.group.create({
                data
            })
            res.status(201).json(newGroup)

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params['id'])
            const group = await prisma.group.findUnique({
                where: {id: groupId},
                include: {leads: true}  
            })
            if (!group) {
                res.status(404).json({ message: 'Grupo não encontrado' })
                return
            }
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params['id'])
            const body = updateGroupRequestSchemas.parse(req.body)
            const data: Prisma.GroupUpdateInput = {}
            if (body.name) data.name = body.name
            if (body.description) data.description = body.description

            const updatedGroup = await prisma.group.update({
                where: {
                    id: groupId,
                },
                data
            })
            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params['id'])
            const deletedGroup = await prisma.group.delete({
                where: {
                    id: groupId,
                }
            })
            res.json(deletedGroup)

        } catch (error) {
            next(error)
        }
    }
}
