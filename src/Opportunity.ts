// https://developer.copper.com/opportunities/overview.html
export interface Opportunity {
  id?: number
  name: string
  assignee_id?: number
  close_date?: string
  company_id?: number
  company_name?: string
  customer_source_id?: number
  details?: string
  loss_reason_id?: number
  monetary_value?: number
  pipeline_id?: number
  primary_contact_id: number
  priority?: "None" | "Low" | "Medium" | "High"
  pipeline_stage_id?: number
  status?: "Open" | "Won" | "Lost" | "Abandoned"
  tags?: string[]
  win_probability?: number
  date_created?: number
  date_modified?: number
  custom_fields?: { custom_field_definition_id: number, value: string }[]
}
