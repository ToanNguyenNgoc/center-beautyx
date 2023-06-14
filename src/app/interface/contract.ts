import { IOrganization } from "./organization"

export interface IContract {
    id: number,
    package_name: string,
    start?: any,
    end?: any,
    company_name: string,
    address: string,
    telephone: string,
    email: string[],
    organization_id: number,
    approve_id: number,
    storage_in_mb?: any,
    account_limit: number,
    branch_limit: number,
    extra: {
        representative: string,
        position_title?: string,
        corporate_tax_code?: any,
        ecommerce_branch: string[],
        accountant_name: string,
        accountant_position?: any,
        accountant_email: string,
        accountant_phone: string
    },
    bank_owner_name?: string,
    bank_number?: number,
    bank_name: string,
    signature: string,
    pdf: string,
    created_at: string,
    updated_at: string,
    deleted_at?: null,
    approve: {
        id: number,
        type: string,
        status: string,
        approvable_type: string,
        approvable_id: number,
        organization_id: number,
        created_at: string,
        updated_at: string
    },
    organization: IOrganization
}