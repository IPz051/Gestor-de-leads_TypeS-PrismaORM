import { type Lead, type LeadStatus, type Prisma } from "@prisma/client";
export interface leadWhereParams {
    name?: {
        like?: string;
        equals?: string;
        mode?: "insensitive" | "default";
    };
    status?: LeadStatus;
}
export interface findLeadsParams {
    where?: leadWhereParams;
    sortBy?: "name" | "status" | "createdAt";
    orderBy?: "asc" | "desc";
    limit?: number;
    offset?: number;
}
export interface LeadCreateInput {
    name: string;
    email: string;
    phone?: string;
    status?: LeadStatus;
}
export interface leadsRepository {
    find: (params: findLeadsParams) => Promise<Lead[]>;
    count: (params: leadWhereParams) => Promise<number>;
    create: (data: LeadCreateInput) => Promise<Lead>;
    findById: (id: number) => Promise<Lead | null>;
    updateById: (id: number, data: Prisma.LeadUpdateInput) => Promise<Lead>;
    deleteById: (id: number) => Promise<Lead>;
}
//# sourceMappingURL=leadsRepositories.d.ts.map