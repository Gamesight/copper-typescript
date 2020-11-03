import fetch from 'node-fetch'
import { Lead, LeadCustomField, ListLeadsRequestParams } from './Leads'
import { Person } from './People'
import { Company, ContactType } from './Companies'
import { Opportunity } from './Opportunity'
import { Project } from './Projects'
import { Task } from './Tasks'
import { Activity } from './Activities'
import { Subscription, Relation, Connection, CustomActivityType, CustomField, ListCustomFieldRequestParams, DeleteResponse } from './CustomFields'

const URL: string = "https://api.prosperworks.com/developer_api/v1"

interface CopperHeaders {
  "X-PW-AccessToken": string
  "X-PW-Application": string
  "X-PW-UserEmail": string
  "Content-Type": string
}

export class Copper {
  headers: CopperHeaders
  constructor(access_token: string, email: string){
    this.headers = {
      "X-PW-AccessToken": access_token,
      "X-PW-UserEmail": email,
      "X-PW-Application": "developer_api",
      "Content-Type": "application/json"
    }
  }

  copperRequest<T>(url: string, method: string, params?: any): Promise<T> {
    const data: any = {
      method,
      headers: this.headers
    }
    if(params){
      data.body = JSON.stringify(params)
    }
    return fetch(url, data).then((res: any)=>res.json())
  }

  // Leads
  createLead(lead: Lead): Promise<Lead> {
    return this.copperRequest<Lead>(`${URL}/leads`, "post", lead)
  }
  createLeads(leads: Lead[]): Promise<Lead[]> {
    return Promise.all(leads.map((lead: Lead)=>this.createLead(lead)))
  }
  fetchLeadById(id: number): Promise<Lead> {
    return this.copperRequest<Lead>(`${URL}/leads/${id}`, "get")
  }
  listLeads(params?: ListLeadsRequestParams): Promise<Lead[]> {
    return this.copperRequest<Lead[]>(`${URL}/leads/search`, "post", params)
  }
  listAllLeads(): Promise<Lead[]> {
    return new Promise<Lead[]>(async (resolve, reject)=>{
      const data = {
        page_number: 1,
        page_size: 200
      }
      let leads: Lead[] = []
      while(leads.length % data.page_size == 0){
        await this.listLeads(data).then((new_leads: [])=>leads = leads.concat(new_leads))
        data.page_number++
      }
      return resolve(leads)
    })
  }
  updateLead(id: number, lead: any): Promise<Lead> {
    return this.copperRequest<Lead>(`${URL}/leads/${id}`, "put", lead)
  }
  upsertLead(lead: Lead, match: any): Promise<Lead> {
    return this.copperRequest<Lead>(`${URL}/leads/upsert`, "put", {properties: lead, match})
  }
  deleteLead(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/leads/${id}`, "delete")
  }
  deleteLeads(ids: number[]): Promise<DeleteResponse[]> {
    return Promise.all(ids.map((id: number)=>this.deleteLead(id)))
  }
  convertLead(id: number, details: any): Promise<any> {
    return this.copperRequest<any>(`${URL}/leads/${id}/convert`, "post", details)
  }

  // People
  createPerson(person: Person): Promise<Person> {
    return this.copperRequest<Person>(`${URL}/people`, "post", person)
  }
  updatePerson(id: number, field: any): Promise<Person> {
    return this.copperRequest<Person>(`${URL}/people/${id}`, "put", field)
  }
  deletePerson(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/people/${id}`, "delete")
  }
  listPeople(params: any = {}): Promise<Person[]> {
    return this.copperRequest<Person[]>(`${URL}/people/search`, "post", params)
  }
  listPersonActivities(id: number, params: any = {}): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/people/${id}/activities`, "post", params)
  }
  fetchPersonById(id: number): Promise<Person> {
    return this.copperRequest<Person>(`${URL}/people/${id}`, "get")
  }
  fetchPersonByEmail(email: string): Promise<Person> {
    return this.copperRequest<Person>(`${URL}/people/fetch_by_email`, "post", {email})
  }

  // Companies
  fetchCompanyById(id: number): Promise<Company> {
    return this.copperRequest<Company>(`${URL}/companies/${id}`, "get")
  }
  createCompany(company: Company): Promise<Company> {
    return this.copperRequest<Company>(`${URL}/companies`, "post", company)
  }
  updateCompany(id: number, field: Company): Promise<Company> {
    return this.copperRequest<Company>(`${URL}/companies/${id}`, "put", field)
  }
  deleteCompany(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/companies/${id}`, "delete")
  }
  listCompanies(params: any = {}): Promise<Company[]> {
    return this.copperRequest<Company[]>(`${URL}/companies/search`, "post", params)
  }
  listAllCompanies(): Promise<Company[]> {
    return new Promise<Company[]>(async (resolve, reject)=>{
      const data = {
        page_number: 1,
        page_size: 200
      }
      let companies: Company[] = []
      while(companies.length % data.page_size == 0){
        await this.listCompanies(data).then((new_companies: Company[])=>companies = companies.concat(new_companies))
        data.page_number++
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      return resolve(companies)
    })
  }
  listCompanyActivities(id: number, params: any = {}): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/companies/${id}/activities`, "post", params)
  }
  listContactTypes(): Promise<ContactType[]> {
    return this.copperRequest<ContactType[]>(`${URL}/contact_types`, "get")
  }

  // Opportunities
  fetchOpportunityById(id: number): Promise<Opportunity> {
    return this.copperRequest<Opportunity>(`${URL}/opportunities/${id}`, "get")
  }
  createOpportunity(opportunity: Opportunity): Promise<Opportunity> {
    return this.copperRequest<Opportunity>(`${URL}/opportunities`, "post", opportunity)
  }
  updateOpportunity(id: number, opportunity: Opportunity): Promise<Opportunity> {
    return this.copperRequest<Opportunity>(`${URL}/opportunities/${id}`, "put", opportunity)
  }
  deleteOpportunity(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/opportunities/${id}`, "delete")
  }
  listOpportunities(params: any = {}): Promise<Opportunity[]> {
    return this.copperRequest<Opportunity[]>(`${URL}/opportunities/search`, "post", params)
  }
  listCustomerSources(): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/customer_sources`, "get")
  }
  listLossReasons(): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/loss_reasons`, "get")
  }
  listPipelines(): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/pipelines`, "get")
  }
  listPipelineStages(): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/pipeline_stages`, "get")
  }
  listStagesInPipeline(id: number): Promise<any[]> {
    return this.copperRequest<any[]>(`${URL}/pipeline_stages/pipeline/${id}`, "get")
  }

  // Projects
  fetchProjectById(id: number): Promise<Project> {
    return this.copperRequest<Project>(`${URL}/projects/${id}`, "get")
  }
  createProject(project: Project): Promise<Project> {
    return this.copperRequest<Project>(`${URL}/projects`, "post", project)
  }
  updateProject(id: number, field: Project): Promise<Project> {
    return this.copperRequest<Project>(`${URL}/projects/${id}`, "put", field)
  }
  deleteProject(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/projects/${id}`, "delete")
  }
  listProjects(params: any = {}): Promise<Project[]> {
    return this.copperRequest<Project[]>(`${URL}/projects/search`, "post", params)
  }

  // Tasks
  fetchTaskById(id: number): Promise<Task> {
    return this.copperRequest<Task>(`${URL}/tasks/${id}`, "get")
  }
  createTask(task: Task): Promise<Task> {
    return this.copperRequest<Task>(`${URL}/tasks`, "post", task)
  }
  updateTask(id: number, field: Task): Promise<Task> {
    return this.copperRequest<Task>(`${URL}/tasks/${id}`, "put", field)
  }
  deleteTask(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/tasks/${id}`, "delete")
  }
  listTasks(params: any = {}): Promise<Task[]> {
    return this.copperRequest<Task[]>(`${URL}/tasks/search`, "post", params)
  }


  // Activities
  fetchActivityById(id: number): Promise<Activity> {
    return this.copperRequest<Activity>(`${URL}/activitys/${id}`, "get")
  }
  createActivity(activity: Activity): Promise<Activity> {
    return this.copperRequest<Activity>(`${URL}/activitys`, "post", activity)
  }
  updateActivity(id: number, field: Activity): Promise<Activity> {
    return this.copperRequest<Activity>(`${URL}/activitys/${id}`, "put", field)
  }
  deleteActivity(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/activitys/${id}`, "delete")
  }
  listActivities(params: any = {}): Promise<Activity[]> {
    return this.copperRequest<Activity[]>(`${URL}/activitys/search`, "post", params)
  }
  listActivityTypes(): Promise<Activity[]> {
    return this.copperRequest<Activity[]>(`${URL}/activity_types`, "get")
  }

  // CustomActivityTypes
  getCustomActivityType(id: number): Promise<CustomActivityType> {
    return this.copperRequest<CustomActivityType>(`${URL}/custom_activity_types/${id}`, "get")
  }
  listCustomActivityTypes(): Promise<CustomActivityType[]> {
    return this.copperRequest<CustomActivityType[]>(`${URL}/custom_activity_types`, "get")
  }
  updateCustomActivityType(id: number, params: any = {}): Promise<CustomActivityType> {
    return this.copperRequest<CustomActivityType>(`${URL}/custom_activity_types/${id}`, "put", params)
  }
  createCustomActivityType(params: CustomActivityType): Promise<CustomActivityType> {
    return this.copperRequest<CustomActivityType>(`${URL}/custom_activity_types`, "post", params)
  }

  // CustomFields
  createCustomField(field: CustomField): Promise<CustomField> {
    return this.copperRequest<CustomField>(`${URL}/custom_field_definitions`, "post", field)
  }
  updateCustomField(id: number, field: CustomField): Promise<CustomField> {
    return this.copperRequest<CustomField>(`${URL}/custom_field_definitions/${id}`, "put", field)
  }
  deleteCustomField(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/custom_field_definitions/${id}`, "delete")
  }
  listCustomFields(params?: ListCustomFieldRequestParams): Promise<CustomField[]> {
    return this.copperRequest<CustomField[]>(`${URL}/custom_field_definitions`, "get", params)
  }
  fetchCustomFieldById(id: number): Promise<CustomField> {
    return this.copperRequest<CustomField>(`${URL}/custom_field_definitions/${id}`, "get")
  }

  // ConnectFields
  deleteConnection(id: number): Promise<DeleteResponse> {
    return this.copperRequest<DeleteResponse>(`${URL}/related_links/${id}`, "delete")
  }
  listConnectionsByEntity(source_id: number, source_type: string): Promise<Connection[]> {
    return this.copperRequest<Connection[]>(`${URL}/related_links?source_type=${source_type}&source_id=${source_id}`, "get")
  }
  listConnectionsByEntityWithCustomField(source_id: number, source_type: string, custom_field_definition_id: number): Promise<Connection[]> {
    return this.copperRequest<Connection[]>(`${URL}/related_links?source_type=${source_type}&source_id=${source_id}&custom_field_definition_id=${custom_field_definition_id}`, "get")
  }
  createConnection(params: Connection): Promise<Connection> {
    return this.copperRequest<Connection>(`${URL}/related_links`, "post")
  }

  // Related Items
  listRelatedRecords(entity: string, entity_id: number): Promise<Relation[]> {
    return this.copperRequest<Relation[]>(`${URL}/${entity}/${entity_id}/related`, "get")
  }
  listRelatedRecordsByType(entity: string, entity_id: number, related_entity_name: string): Promise<Relation[]> {
    return this.copperRequest<Relation[]>(`${URL}/${entity}/${entity_id}/related/${related_entity_name}`, "get")
  }
  createRelation(entity: string, entity_id: number, resource: any): Promise<Relation> {
    return this.copperRequest<Relation>(`${URL}/${entity}/${entity_id}/related`, "post", resource)
  }
  deleteRelation(entity: string, entity_id: number, resource: any): Promise<any> {
    return this.copperRequest<any>(`${URL}/${entity}/${entity_id}/related`, "delete", resource)
  }

  // Webhooks
  createSubscription(params: Subscription): Promise<Subscription> {
    return this.copperRequest<Subscription>(`${URL}/webhooks`, "post", params)
  }
  deleteSubscription(id: number): Promise<any> {
    return this.copperRequest<any>(`${URL}/webhooks/${id}`, "delete")
  }
  listSubscriptions(): Promise<Subscription[]> {
    return this.copperRequest<Subscription[]>(`${URL}/webhooks`, "get")
  }
  fetchSubscriptionById(id: number): Promise<Subscription> {
    return this.copperRequest<Subscription>(`${URL}/webhooks/{id}`, "get")
  }


  // Util
  nameToCustomFieldId(name: string, fields: CustomField[]): number {
    const field: CustomField = fields.find((field: CustomField)=>field.name.toLowerCase().includes(name.toLowerCase()))
    if(!field) throw new Error("Field not found")
    return field.id
  }
  customFieldValueFromId(record: any, id: number): any {
    const field: LeadCustomField = record.custom_fields.find((field: LeadCustomField)=>field.custom_field_definition_id == id)
    if(!field) throw new Error("Field not found")
    return field.value
  }
  customFieldValueFromName(record: any, name: string, all_fields: CustomField[]): any {
    const field_id: number = this.nameToCustomFieldId(name, all_fields)
    const field_value: any = this.customFieldValueFromId(record, field_id)
    return field_value
  }
}
