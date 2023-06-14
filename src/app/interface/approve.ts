import { IOrganization } from "./organization"

export interface ILog {
    approve_id: number,
    created_at: string,
    employee?: string,
    employee_id?: number,
    id: number,
    note: string,
    updated_at: string
}

export interface IApprove {
    approvable_id: number,
    approvable_type: string,
    created_at: string,
    id: number,
    logs: ILog[],
    organization: IOrganization,
    organization_id: number,
    status: "PENDING" | "REVIEW" | "REJECT" | "APPROVED",
    type: "ORGANIZATION" | "BRANCH" | "SERVICE" | "PRODUCT" | "REPAY_CARD" | "TREATMENT_COMBO",
    updated_at: string
}