// https://developer.copper.com/people/overview.html
export interface Person {
  id?: number
  name: string
  address?: any
  assignee_id?: number
  company_id?: string
  company_name?: string
  contact_type_id?: number
  details?: string
  emails?: { email: string, category: string }[]
  websites?: { url: string, category: string }[]
  phone_numbers?: { number: string, category: string }[]
  socials?: { url: string, category: string }[]
  tags?: string[]
  title?: string
  date_created?: number
  date_modified?: number
  custom_fields?: { custom_field_definition_id: number, value: string }[]
}
