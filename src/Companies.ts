// https://developer.copper.com/companies/overview.html
export interface Company {
  id?: number
  name: string
  address?: any
  assignee_id?: number
  contact_type_id?: number
  details?: string
  email_domain?: string
  phone_numbers?: { number: string, category: string }[]
  socials?: { url: string, category: string }[]
  tags?: string[]
  websites?: { url: string, category: string }[]
  date_created?: number
  date_modified?: number
  custom_fields?: { custom_field_definition_id: number, value: string }[]
}

export interface ContactType {
  id: number
  name: string
}
