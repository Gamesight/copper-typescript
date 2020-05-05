// https://developer.copper.com/leads/overview.html
export interface LeadCustomField {
  custom_field_definition_id: number
  value: any
}

export interface Lead {
  id?: number
  name: string
  prefix?: string
  first_name?: string
  last_name?: string
  middle_name?: string
  suffix?: string
  address?: {
    street?: string
    city?: string
    state?: string
    postal_code?: number
    country?: string
  }
  assignee_id?: number
  company_name?: string
  customer_source_id?: number
  details?: string
  email?: { email: string, category: string }
  interaction_count?: number
  monetary_value?: number
  socials?: { url: string, category: string}[]
  status?: string
  status_id?: number
  tags?: string[]
  title?: string
  websites?: { url: string, category: string }[]
  phone_numbers?: { number?: string, category?: string }[]
  custom_fields?: LeadCustomField[]
  date_created?: number
  date_modified?: number
  date_last_contacted?: number
}

export interface ListLeadsRequestParams {
  page_number?: number
  page_size?: number
  sort_by?:	string
  sort_direction?: "asc" | "desc"
  name?: string
  phone_number?: string
  emails?: string
  assignee_ids?: number[]
  status_ids?:	number[]
  customer_source_ids?:	number[]
  city?:	string
  state?:	string
  postal_code?:	string
  country?:	string
  tags?:	string[]
  followed?:	number
  age?:	number
  minimum_monetary_value?:	number
  maximum_monetary_value?:	number
  minimum_interaction_count?:	number
  maximum_interaction_count?:	number
  minimum_interaction_date?: Date
  maximum_interaction_date?: Date
  minimum_created_date?: Date
  maximum_created_date?: Date
  minimum_modified_date?:	Date
  maximum_modified_date?: Date
  include_converted_leads?:	boolean
}
