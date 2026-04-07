import { Handler } from "express";
import { prisma } from "../../database/index";
import createLeadRequestSchemas, { GetLeadRequestSchemas } from "./schemas/leadsRequestSchemas";
import { type Prisma, type $Enums } from "@prisma/client";

export class LeadsController {
 index : Handler = async (_req, res, next) => {
    try {
      const query = GetLeadRequestSchemas.parse(_req.query)
      const { page = 1, pageSize = 10, name, status, sortBy = "name", orderBy = "asc" } = query

      const where : Prisma.LeadWhereInput = {}
        if(name) where.name = { contains: name, mode: "insensitive" }
        if (status) where.status = { equals: status }


      const leads = await prisma.lead.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {[sortBy]: orderBy}
      })
      const total = await prisma.lead.count({ where })
      res.json({
        leads,
        total,
        page,
        pageSize,
        sortBy,
        orderBy,
      })
    } catch (error) {
      next(error)
    }
  }
  create : Handler = async (req, res, next) => {
  try {
    const body = createLeadRequestSchemas.parse(req.body)
    const data: Prisma.LeadCreateInput = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
    }
    if (body.status !== undefined) {
      data.status = body.status as $Enums.LeadStatus
    }
    const newLead = await prisma.lead.create({ data })
    res.status(201).json(newLead) 
  } catch (error) {
    next(error)
  }
  }
  show : Handler = async (req, res, next) => {
    try {
      const id = Number(req.params['id'])
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "id inválido" })
        return
      }
      const lead = await prisma.lead.findUnique({
        where: { id },
        include: { groups: true }
      })
      if (lead === null) {
        res.status(404).json({ message: "Lead não encontrado" })
        return
      }
      res.json(lead)
    } catch (error) {
      next(error)
    }
  }
  update : Handler = async (req, res, next) => {
    try {
      const id = Number(req.params['id'])
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "id inválido" })
        return
      }
      const body = createLeadRequestSchemas.parse(req.body)
      
      const lead = await prisma.lead.findUnique({
        where: { id }
      })
      if (lead === null) {
        res.status(404).json({ message: "Lead não encontrado" })
        return
      }

      const data: Prisma.LeadUpdateInput = {
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
      }
      if (body.status !== undefined) {
        data.status = body.status as $Enums.LeadStatus
      }

      if(lead.status === "new" && body.status !== undefined && body.status !== "contacted"){
        res.status(400).json(
          { message: "Um lead com status 'new' deve ser alterado para 'contacted' antes de outros status." }
        )
        return
      }

      if(body.status && body.status === "archived"){
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - lead.createdAt.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if(diffDays < 30){
          res.status(400).json(
            { message: "Um lead com status 'archived' deve ter sido criado há pelo menos 30 dias." }
          )
          return
        }
      }
      const updatedLead = await prisma.lead.update({
        where: { id },
        data
      })
      res.json(updatedLead)
    } catch (error) {
      next(error)
    }
  }
  delete : Handler = async (req, res, next) => {
    try {
      const id = Number(req.params['id'])
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "id inválido" })
        return
      }
      const deletedLead = await prisma.lead.delete({
        where: { id }
      })
      res.json(deletedLead)
    } catch (error) {
      next(error)
    }
  }
}
