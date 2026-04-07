import { Lead } from "@prisma/client";
import { $Enums } from "../generated/prisma/browser";
import { LeadUpdateInput } from "../generated/prisma/models";


export interface leadWhereParams {
  name?: {
    like? :string
  equals?: string
  mode?: "insensitive" | "default"
}
  status?: $Enums.LeadStatus
}

export interface findLeadsParams {
  where?: leadWhereParams
  sortBy?: "name" | "status" | "createdAt"
  orderBy?: "asc" | "desc"
  limit?: number
  offset?: number
}

export interface LeadCreateInput {
  name: string
  email: string
  phone?: string
  status?: $Enums.LeadStatus
}

export interface leadsRepository {
  find: (params : findLeadsParams) => Promise<Lead[]>
  count: (params: leadWhereParams) => Promise<number>
  create: (data: LeadCreateInput) => Promise<Lead>
  findById: (id: number) => Promise<Lead | null>
  updateById: (id: number, data: LeadUpdateInput) => Promise<Lead>
  deleteById: (id: number) => Promise<Lead>
}
