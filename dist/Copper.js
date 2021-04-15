"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const URL = "https://api.prosperworks.com/developer_api/v1";
class Copper {
    constructor(access_token, email) {
        this.headers = {
            "X-PW-AccessToken": access_token,
            "X-PW-UserEmail": email,
            "X-PW-Application": "developer_api",
            "Content-Type": "application/json"
        };
    }
    copperRequest(url, method, params) {
        const data = {
            method,
            headers: this.headers
        };
        if (params) {
            data.body = JSON.stringify(params);
        }
        return node_fetch_1.default(url, data).then((res) => res.json());
    }
    // Leads
    createLead(lead) {
        return this.copperRequest(`${URL}/leads`, "post", lead);
    }
    createLeads(leads) {
        return Promise.all(leads.map((lead) => this.createLead(lead)));
    }
    fetchLeadById(id) {
        return this.copperRequest(`${URL}/leads/${id}`, "get");
    }
    listLeads(params) {
        return this.copperRequest(`${URL}/leads/search`, "post", params);
    }
    listAllLeads() {
        return new Promise(async (resolve, reject) => {
            const data = {
                page_number: 1,
                page_size: 200
            };
            let leads = [];
            while (leads.length % data.page_size == 0) {
                await this.listLeads(data).then((new_leads) => leads = leads.concat(new_leads));
                data.page_number++;
            }
            return resolve(leads);
        });
    }
    updateLead(id, lead) {
        return this.copperRequest(`${URL}/leads/${id}`, "put", lead);
    }
    upsertLead(lead, match) {
        return this.copperRequest(`${URL}/leads/upsert`, "put", { properties: lead, match });
    }
    deleteLead(id) {
        return this.copperRequest(`${URL}/leads/${id}`, "delete");
    }
    deleteLeads(ids) {
        return Promise.all(ids.map((id) => this.deleteLead(id)));
    }
    convertLead(id, details) {
        return this.copperRequest(`${URL}/leads/${id}/convert`, "post", details);
    }
    // People
    createPerson(person) {
        return this.copperRequest(`${URL}/people`, "post", person);
    }
    updatePerson(id, field) {
        return this.copperRequest(`${URL}/people/${id}`, "put", field);
    }
    deletePerson(id) {
        return this.copperRequest(`${URL}/people/${id}`, "delete");
    }
    listPeople(params = {}) {
        return this.copperRequest(`${URL}/people/search`, "post", params);
    }
    listAllPeople() {
        return new Promise(async (resolve, reject) => {
            const data = {
                page_number: 1,
                page_size: 200
            };
            let people = [];
            while (people.length % data.page_size == 0) {
                await this.listPeople(data).then((new_tasks) => people = people.concat(new_tasks));
                data.page_number++;
            }
            return resolve(people);
        });
    }
    listPersonActivities(id, params = {}) {
        return this.copperRequest(`${URL}/people/${id}/activities`, "post", params);
    }
    fetchPersonById(id) {
        return this.copperRequest(`${URL}/people/${id}`, "get");
    }
    fetchPersonByEmail(email) {
        return this.copperRequest(`${URL}/people/fetch_by_email`, "post", { email });
    }
    // Companies
    fetchCompanyById(id) {
        return this.copperRequest(`${URL}/companies/${id}`, "get");
    }
    createCompany(company) {
        return this.copperRequest(`${URL}/companies`, "post", company);
    }
    updateCompany(id, field) {
        return this.copperRequest(`${URL}/companies/${id}`, "put", field);
    }
    deleteCompany(id) {
        return this.copperRequest(`${URL}/companies/${id}`, "delete");
    }
    listCompanies(params = {}) {
        return this.copperRequest(`${URL}/companies/search`, "post", params);
    }
    listAllCompanies() {
        return new Promise(async (resolve, reject) => {
            const data = {
                page_number: 1,
                page_size: 200
            };
            let companies = [];
            while (companies.length % data.page_size == 0) {
                await this.listCompanies(data).then((new_companies) => companies = companies.concat(new_companies));
                data.page_number++;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            return resolve(companies);
        });
    }
    listCompanyActivities(id, params = {}) {
        return this.copperRequest(`${URL}/companies/${id}/activities`, "post", params);
    }
    listContactTypes() {
        return this.copperRequest(`${URL}/contact_types`, "get");
    }
    // Opportunities
    fetchOpportunityById(id) {
        return this.copperRequest(`${URL}/opportunities/${id}`, "get");
    }
    createOpportunity(opportunity) {
        return this.copperRequest(`${URL}/opportunities`, "post", opportunity);
    }
    updateOpportunity(id, opportunity) {
        return this.copperRequest(`${URL}/opportunities/${id}`, "put", opportunity);
    }
    deleteOpportunity(id) {
        return this.copperRequest(`${URL}/opportunities/${id}`, "delete");
    }
    listOpportunities(params = {}) {
        return this.copperRequest(`${URL}/opportunities/search`, "post", params);
    }
    listAllOpportunities() {
        return new Promise(async (resolve, reject) => {
            const data = {
                page_number: 1,
                page_size: 200
            };
            let opportunities = [];
            while (opportunities.length % data.page_size == 0) {
                await this.listOpportunities(data).then((new_opportunities) => opportunities = opportunities.concat(new_opportunities));
                data.page_number++;
            }
            return resolve(opportunities);
        });
    }
    listCustomerSources() {
        return this.copperRequest(`${URL}/customer_sources`, "get");
    }
    listLossReasons() {
        return this.copperRequest(`${URL}/loss_reasons`, "get");
    }
    listPipelines() {
        return this.copperRequest(`${URL}/pipelines`, "get");
    }
    listPipelineStages() {
        return this.copperRequest(`${URL}/pipeline_stages`, "get");
    }
    listStagesInPipeline(id) {
        return this.copperRequest(`${URL}/pipeline_stages/pipeline/${id}`, "get");
    }
    // Projects
    fetchProjectById(id) {
        return this.copperRequest(`${URL}/projects/${id}`, "get");
    }
    createProject(project) {
        return this.copperRequest(`${URL}/projects`, "post", project);
    }
    updateProject(id, field) {
        return this.copperRequest(`${URL}/projects/${id}`, "put", field);
    }
    deleteProject(id) {
        return this.copperRequest(`${URL}/projects/${id}`, "delete");
    }
    listProjects(params = {}) {
        return this.copperRequest(`${URL}/projects/search`, "post", params);
    }
    // Tasks
    fetchTaskById(id) {
        return this.copperRequest(`${URL}/tasks/${id}`, "get");
    }
    createTask(task) {
        return this.copperRequest(`${URL}/tasks`, "post", task);
    }
    updateTask(id, field) {
        return this.copperRequest(`${URL}/tasks/${id}`, "put", field);
    }
    deleteTask(id) {
        return this.copperRequest(`${URL}/tasks/${id}`, "delete");
    }
    listTasks(params = {}) {
        return this.copperRequest(`${URL}/tasks/search`, "post", params);
    }
    listAllTasks() {
        return new Promise(async (resolve, reject) => {
            const data = {
                page_number: 1,
                page_size: 200
            };
            let tasks = [];
            while (tasks.length % data.page_size == 0) {
                await this.listTasks(data).then((new_tasks) => tasks = tasks.concat(new_tasks));
                data.page_number++;
            }
            return resolve(tasks);
        });
    }
    // Activities
    fetchActivityById(id) {
        return this.copperRequest(`${URL}/activitys/${id}`, "get");
    }
    createActivity(activity) {
        return this.copperRequest(`${URL}/activitys`, "post", activity);
    }
    updateActivity(id, field) {
        return this.copperRequest(`${URL}/activitys/${id}`, "put", field);
    }
    deleteActivity(id) {
        return this.copperRequest(`${URL}/activitys/${id}`, "delete");
    }
    listActivities(params = {}) {
        return this.copperRequest(`${URL}/activitys/search`, "post", params);
    }
    listActivityTypes() {
        return this.copperRequest(`${URL}/activity_types`, "get");
    }
    // CustomActivityTypes
    getCustomActivityType(id) {
        return this.copperRequest(`${URL}/custom_activity_types/${id}`, "get");
    }
    listCustomActivityTypes() {
        return this.copperRequest(`${URL}/custom_activity_types`, "get");
    }
    updateCustomActivityType(id, params = {}) {
        return this.copperRequest(`${URL}/custom_activity_types/${id}`, "put", params);
    }
    createCustomActivityType(params) {
        return this.copperRequest(`${URL}/custom_activity_types`, "post", params);
    }
    // CustomFields
    createCustomField(field) {
        return this.copperRequest(`${URL}/custom_field_definitions`, "post", field);
    }
    updateCustomField(id, field) {
        return this.copperRequest(`${URL}/custom_field_definitions/${id}`, "put", field);
    }
    deleteCustomField(id) {
        return this.copperRequest(`${URL}/custom_field_definitions/${id}`, "delete");
    }
    listCustomFields(params) {
        return this.copperRequest(`${URL}/custom_field_definitions`, "get", params);
    }
    fetchCustomFieldById(id) {
        return this.copperRequest(`${URL}/custom_field_definitions/${id}`, "get");
    }
    // ConnectFields
    deleteConnection(id) {
        return this.copperRequest(`${URL}/related_links/${id}`, "delete");
    }
    listConnectionsByEntity(source_id, source_type) {
        return this.copperRequest(`${URL}/related_links?source_type=${source_type}&source_id=${source_id}`, "get");
    }
    listConnectionsByEntityWithCustomField(source_id, source_type, custom_field_definition_id) {
        return this.copperRequest(`${URL}/related_links?source_type=${source_type}&source_id=${source_id}&custom_field_definition_id=${custom_field_definition_id}`, "get");
    }
    createConnection(params) {
        return this.copperRequest(`${URL}/related_links`, "post");
    }
    // Related Items
    listRelatedRecords(entity, entity_id) {
        return this.copperRequest(`${URL}/${entity}/${entity_id}/related`, "get");
    }
    listRelatedRecordsByType(entity, entity_id, related_entity_name) {
        return this.copperRequest(`${URL}/${entity}/${entity_id}/related/${related_entity_name}`, "get");
    }
    createRelation(entity, entity_id, resource) {
        return this.copperRequest(`${URL}/${entity}/${entity_id}/related`, "post", resource);
    }
    deleteRelation(entity, entity_id, resource) {
        return this.copperRequest(`${URL}/${entity}/${entity_id}/related`, "delete", resource);
    }
    // Webhooks
    createSubscription(params) {
        return this.copperRequest(`${URL}/webhooks`, "post", params);
    }
    deleteSubscription(id) {
        return this.copperRequest(`${URL}/webhooks/${id}`, "delete");
    }
    listSubscriptions() {
        return this.copperRequest(`${URL}/webhooks`, "get");
    }
    fetchSubscriptionById(id) {
        return this.copperRequest(`${URL}/webhooks/{id}`, "get");
    }
    // Util
    nameToCustomFieldId(name, fields) {
        const field = fields.find((field) => field.name.toLowerCase() === name.toLowerCase());
        if (!field)
            throw new Error("Field not found");
        return field.id;
    }
    customFieldValueFromId(record, id) {
        const field = record.custom_fields.find((field) => field.custom_field_definition_id == id);
        if (!field)
            throw new Error("Field not found");
        return field.value;
    }
    customFieldValueFromName(record, name, all_fields) {
        const field_id = this.nameToCustomFieldId(name, all_fields);
        const field_value = this.customFieldValueFromId(record, field_id);
        return field_value;
    }
}
exports.Copper = Copper;
//# sourceMappingURL=Copper.js.map